import axios from "axios";

import { Configuration } from "./configuration.js";
import { Response } from "./response.js";

import {
  OPERATIONS,
  PATTERNS,
  C2B_PAYMENT,
  B2C_PAYMENT,
  B2B_PAYMENT,
  REVERSAL,
  QUERY_TRANSACTION_STATUS,
  ERRORS,
  HTTP,
} from "./constants.js";

export class Service {
  constructor(args) {
    this.initDefaultConfigs(args);
  }

  initDefaultConfigs(args) {
    this.config = new Configuration(args);
  }

  handleSend(intent) {
    const opcode = this.detectOperation(intent);
    if (opcode === undefined) {
      const error = new Response(
        ERRORS.INVALID_OPERATION.code,
        ERRORS.INVALID_OPERATION.description,
        []
      );

      return Promise.reject(error);
    }

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

  handleRequest(opcode, intent) {
    const data = this.fillOptionalProperties(opcode, intent);

    const missingProperties = this.detectMissingProperties(opcode, intent);
    if (missingProperties.length > 0) {
      const error = new Response(
        ERRORS.MISSING.code,
        ERRORS.MISSING.description,
        missingProperties
      );

      return Promise.reject(error);
    }

    const validationErrors = this.detectErrors(opcode, data);

    if (validationErrors.length > 0) {
      const error = new Response(
        ERRORS.VALIDATION.code,
        ERRORS.VALIDATION.description,
        missingProperties
      );

      return Promise.reject(error);
    }

    return this.performRequest(opcode, intent);
    /* const error = new Response(
      ERRORS.VALIDATION.code,
      ERRORS.VALIDATION.description,
      missingProperties
    ); */
    // return Promise.reject(error);
  }

  detectOperation(intent) {
    if (Object.prototype.hasOwnProperty.call(intent, "to")) {
      if (PATTERNS.PHONE_NUMBER.test(intent.to)) {
        return B2C_PAYMENT;
      }

      if (PATTERNS.SERVICE_PROVIDER_CODE.test(intent.to)) {
        return B2B_PAYMENT;
      }
    }

    return null;
  }

  detectErrors(opcode, intent) {
    const operations = OPERATIONS[opcode];

    const errors = operations.required.filter((e) => {
      const pattern = operations.validation[e];
      return !pattern.test(intent[e]);
    });

    return errors;
  }

  detectMissingProperties(opcode, data) {
    const required = OPERATIONS[opcode].required;

    const missing = required.filter((e) => {
      return !Object.prototype.hasOwnProperty.call(data, e);
    });

    return missing;
  }

  fillOptionalProperties(opcode, intent) {
    function map(correspondences) {
      for (const k in correspondences) {
        if (
          !Object.prototype.hasOwnProperty.call(intent, k) &&
          Object.prototype.hasOwnProperty.call(this.config, correspondences[k])
        ) {
          intent[k] = this.config[correspondences[k]];
        }
      }

      return intent;
    }

    switch (opcode) {
      case C2B_PAYMENT:
      case B2B_PAYMENT:
        return map({ to: "service_provider_code" });

      case B2C_PAYMENT:
        return map({ from: "service_provider_code" });

      case REVERSAL:
        return map({
          initiator_identifier: "initiator_identifier",
          security_credential: "security_credential",
        });

      case QUERY_TRANSACTION_STATUS:
        return map({
          to: "service_provider_code",
        });
    }

    return intent;
  }

  buildRequestBody(opcode, intent) {
    const body = {};
    for (const oldKey in intent) {
      const newKey = OPERATIONS[opcode].mapping[oldKey];
      body[newKey] = intent[oldKey];
    }

    return body;
  }

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
          url: operation.path,
          method: operation.method,
          path: operation.path,
          headers: headers,
        };

        if (operation.method === HTTP.METHOD.POST) {
          requestData.data = body;
        } else {
          requestData.params = body;
        }

        const self = this;
        return axios(requestData)
          .then((r) => {
            return Promise.resolve(self.buildResponse(r));
          })
          .catch((e) => {
            return Promise.reject(self.buildResponse(e.response));
          });
      }

      const error = new Response(
        ERRORS.INVALID_ENV.code,
        ERRORS.AUTHENTICATION.description,
        []
      );

      return Promise.reject(error);
    } else {
      const error = new Response(
        ERRORS.AUTHENTICATION.code,
        ERRORS.AUTHENTICATION.description,
        []
      );

      return Promise.reject(error);
    }
  }

  buildResponse(result) {
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

  generateAccessToken() {
    this.config.generateAccessToken();
  }
}
