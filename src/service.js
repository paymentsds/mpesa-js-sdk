import axios from "axios";

import { Configuration } from "./configuration.js";
// import { Response } from "./response.js";
import {
  ValidationError,
  AuthenticationError,
  InvalidReceiverError,
  MissingPropertiesError,
  InvalidHostError,
  // TimeoutError
} from "./errors.js";

import {
  OPERATIONS,
  PATTERNS,
  C2B_PAYMENT,
  B2C_PAYMENT,
  B2B_PAYMENT,
  REVERSAL,
  QUERY_TRANSACTION_STATUS,
  // ERRORS,
  HTTP,
} from "./constants.js";

export class Service {
  constructor(args) {
    this.initDefaultConfigs(args);
  }

  /**
   * Initializes default configurations
   * @param {Object} args
   */
  initDefaultConfigs(args) {
    this.config = new Configuration(args);
  }

  /**
   *
   * @param {Object} intent
   */
  handleSend(intent) {
    const opcode = this.detectOperation(intent);

    return this.handleRequest(opcode, intent);
  }

  handleReceive(intent) {
    return this.handleRequest(C2B_PAYMENT, intent);
  }

  handleRevert(intent) {
    return this.handleRequest(REVERSAL, intent);
  }

  handleQuery(intent) {
    return this.handleRequest(QUERY_TRANSACTION_STATUS, intent);
  }

  /**
   * Validates transaction data and performs performs the needed HTTP request
   * @param {string} opcode
   * @param {Object.<string, string>} intent
   */
  handleRequest(opcode, intent) {
    const data = this.fillOptionalProperties(opcode, intent);

    const missingProperties = this.detectMissingProperties(opcode, intent);
    if (missingProperties.length > 0) {
      throw new MissingPropertiesError();
    }

    const validationErrors = this.detectErrors(opcode, data);

    if (validationErrors.length > 0) {
      throw new ValidationError();
    }

    return this.performRequest(opcode, intent);
  }

  /**
   * Detects the operation from the transaction data
   * @param {Object.<string, string>} intent
   */
  detectOperation(intent) {
    if (Object.prototype.hasOwnProperty.call(intent, "to")) {
      if (PATTERNS.PHONE_NUMBER.test(intent.to)) {
        return B2C_PAYMENT;
      }

      if (PATTERNS.SERVICE_PROVIDER_CODE.test(intent.to)) {
        return B2B_PAYMENT;
      }
    }

    throw new InvalidReceiverError();
  }

  /**
   * Detect validation errors from thransaction data
   * @param {string} opcode
   * @param {Object.<string, string>} intent
   */
  detectErrors(opcode, intent) {
    const operations = OPERATIONS[opcode];

    const errors = operations.required.filter((e) => {
      const pattern = operations.validation[e];
      return !pattern.test(intent[e]);
    });

    return errors;
  }

  /**
   * Detects missing properties from transaction data
   * @param {string} opcode
   * @param {Object.<string, string>} data
   */
  detectMissingProperties(opcode, data) {
    const { required } = OPERATIONS[opcode];

    const missing = required.filter((e) => {
      return !Object.prototype.hasOwnProperty.call(data, e);
    });

    return missing;
  }

  /**
   * Complete transaction data from configuration data if it is not already provided
   * @param {string} opcode
   * @param {Object.<string,string>} intent
   */
  fillOptionalProperties(opcode, intent) {
    const self = this;

    function map(correspondences) {
      for (const k in correspondences) {
        if (
          !Object.prototype.hasOwnProperty.call(intent, k) &&
          Object.prototype.hasOwnProperty.call(self.config, correspondences[k])
        ) {
          intent[k] = self.config[correspondences[k]];
        }
      }

      return intent;
    }

    switch (opcode) {
      case C2B_PAYMENT:
        return map({ to: "serviceProviderCode" });

      case B2C_PAYMENT:
      case B2B_PAYMENT:
        return map({ from: "serviceProviderCode" });

      case REVERSAL:
        return map({
          initiatorIdentifier: "initiatorIdentifier",
          securityCredential: "securityCredential",
          to: "serviceProviderCode",
        });

      case QUERY_TRANSACTION_STATUS:
        return map({
          from: "serviceProviderCode",
        });
    }

    return intent;
  }

  /**
   * Formats transaction data to the format required by M-Pesa API
   * @param {string} opcode
   * @param {Object.<string,string>} intent
   */
  buildRequestBody(opcode, intent) {
    const body = {};
    for (const oldKey in intent) {
      const newKey = OPERATIONS[opcode].mapping[oldKey];
      if (
        (opcode === C2B_PAYMENT && oldKey === "from") ||
        (opcode === B2C_PAYMENT && oldKey == "to")
      ) {
        body[newKey] = this.normalizePhoneNumber(intent[oldKey]);
      } else {
        body[newKey] = intent[oldKey];
      }
    }

    return body;
  }

  /**
   * Generates HTTP headers required to perform the request
   * @param {string} opcode
   * @param {Object.<string,string>} intent
   */
  buildRequestHeaders(opcode, intent) {
    const headers = {
      [HTTP.HEADERS.USER_AGENT]: this.config.userAgent,
      [HTTP.HEADERS.ORIGIN]: this.config.origin,
      [HTTP.HEADERS.CONTENT_TYPE]: "application/json",
      [HTTP.HEADERS.AUTHORIZATION]: `Bearer ${this.config.auth}`,
    };

    return headers;
  }

  performRequest(opcode, intent) {
    this.generateAccessToken();

    if (Object.prototype.hasOwnProperty.call(this.config, "environment")) {
      if (Object.prototype.hasOwnProperty.call(this.config, "auth")) {
        const operation = OPERATIONS[opcode];
        const headers = this.buildRequestHeaders(opcode, intent);
        const body = this.buildRequestBody(opcode, intent);

        const requestData = {
          baseURL: `${this.config.environment.scheme}://${this.config.environment.domain}:${operation.port}`,
          insecureHTTPParser: true,
          url: operation.path,
          method: operation.method,
          path: operation.path,
          headers,
          timeout: this.config.timeout * 1000,
          maxRedirects: 0,
        };

        if (operation.method === HTTP.METHOD.GET) {
          requestData.params = body;
        } else {
          requestData.data = body;
        }

        const self = this;
        return axios(requestData)
          .then((r) => {
            return Promise.resolve(self.buildResponse(r));
          })
          .catch((e) => {
            return Promise.reject(self.buildResponse(e));
          });
      }

      throw new AuthenticationError();
    } else {
      throw new InvalidHostError();
    }
  }

  /**
   * Formats the result
   * @param {*} result
   */
  buildResponse(result) {
    if (result.status >= 200 && result.status < 300) {
      return {
        response: {
          status: result.status,
          code: result.data.output_ResponseCode,
          desc: result.data.output_ResponseDesc,
        },
        conversation: result.data.output_ConversationID,
        transaction: result.data.output_TransactionID,
        reference: result.data.output_ThirdPartyReference,
      };
    }
    return {
      response: {
        status: result.response.status,
        statusText: result.response.statusText,
        outputError: result.response.data.output_error,
      },
    };
  }

  /**
   * Generates access token from public key and API key pair
   */
  generateAccessToken() {
    this.config.generateAccessToken();
  }

  normalizePhoneNumber(phoneNumber) {
    const phoneNumberCountryCode = /^((?<prefix>(00?|\+)?258)?)(?<localNumber>8[54][0-9]{7})$/;

    return `258${phoneNumber.match(phoneNumberCountryCode).groups.localNumber}`;
  }
}
