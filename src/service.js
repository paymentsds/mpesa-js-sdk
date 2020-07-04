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
    let opcode = this.detectOperation(intent);
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

  detectErrors(opcode, intent) {}
  
  detectMissingProperties(opcode, data) {
  	
  }

  fillOptionalPproperties(opcode, intent) {}
}
