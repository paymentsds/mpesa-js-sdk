import { axios } from "axios";

import { Configuration } from "./configuration.js";
import {
  operations,
  PATTERNS,
  C2B_PAYMENT,
  B2C_PAYMENT,
  B2B_PAYMENT,
  REVERSAL,
  QUERY_TRANSACTION_STATUS,
} from "./constants.js";

export class Service {
  constructor(args) {
    this.initDefaultConfigs();
    this.initHttpClient();
  }

  initHttpClient() {
    this.httpClient = axios({});
  }

  initDefaultConfigs(args) {
    this.config = new Configuration(args);
  }

  handleSend(intent) {
    const opcode = this.detectOperation(intent);
    return this.handleRequest(B2C_PAYMENT, intent);

    // Handle error
  }

  handleReceive(intent) {
    return this.handleRequest(C2B_PAYMENT, intent);
  }

  handleRevert(intent) {
    return this.handleRequest(REVERSAL, intent);
  }

  handleQuery(intent) {
    return handleRequest(QUERY_TRANSACTION_STATUS, intent);
  }

  handleRequest(opcode, intent) {
    const data = this.fillOptionalProperties(opcode, intent);
    const missingProperties = this.detectMissingProperties(opcode, intent);

    if (missingProperties.length > 0) {
      // return missing data errors
    }

    const validationErrors = this.detectErrors(opcode, data);

    if (validationErrors.length > 0) {
      // return validation errors
    }

    // Make request
  }

  detectOperation(data) {}

  detectErrors(opcode, intent) {
    const errors = required.filter((e) => {
      const pattern = operations.validation[e];
      return !pattern.test(intent[e]);
    });

    return errors;
  }

  detectMissingProperties(opcode, data) {
    const required = OPERATIONS[opcode].required;
    const missing = required.filter((e) => {
      return !data.hasOwnProperty(e);
    });

    return missing;
  }

  fillOptionalPproperties(opcode, intent) {
    function map(correspondences) {
      for (let k in correspondences) {
        if (
          !intent.hasOwnProperty(k) &&
          this.confi.hasOwnProperty(correspondences[k])
        ) {
          intent[k] = this.config[correspondeces[k]];
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
}
