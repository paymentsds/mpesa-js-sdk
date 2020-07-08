import crypto from "crypto";

import { Pattern } from "./pattern.js";
import { Environment } from "./environment.js";
import { Operation } from "./operation.js";
import { AccessToken } from "./security.js";

export class Configuration {
  static environments = {
    sandbox: Environment.SANDBOX,
    production: Environment.PRODUCTION,
  };

  static PARAMS = [
    "environment",
    "apiKey",
    "publicKey",
    "accessToken",
    "verifySSL",
    "timeout",
    "debugging",
    "userAgent",
    "origin",
    "securityCode",
    "serviceProviderCode",
    "initiatorIdentifier",
  ];

  constructor(args) {
    this.environment = Configuration.environments.sandbox;
    this.verifySSL = false;
    this.timeout = 0;
    this.debugging = true;
    this.origin = "*";
    this.userAgent = "MPesa";

    this.buildDefaultHeaders();
    this.buildDefaultOperations();

    if (args !== null && args !== undefined) {
      for (let key of Configuration.PARAMS) {
        if (args.hasOwnProperty(key)) {
          if (key == "environment") {
            this.key = Environment.fromURL(args[key]);
          } else {
            this[key] = args[key];
          }
        }
      }
    }
  }

  buildDefaultOperations() {
    this.defaultOperations = {
      C2B_PAYMENT: new Operation({
        name: "c2bPayment",
        method: "POST",
        port: "18352",
        path: "/ipg/v1x/c2bPayment/singleStage",
        input: {
          mapping: {
            number: "input_CustomerMSISDN",
            from: "input_CustomerMSISDN",
            to: "input_ServiceProviderCode",
            amount: "input_Amount",
            transaction: "input_TransactionReference",
            reference: "input_ThirdPartyReference",
          },
          validation: {
            from: Pattern.PHONE_NUMBER,
            to: Pattern.SERVICE_PROVIDER_CODE,
            amount: Pattern.MONEY_AMOUNT,
            transaction: Pattern.WORD,
            reference: Pattern.WORD,
          },
          type: "body",
        },

        outputMapping: {},
      }),
      QUERY_TRANSACTION_STATUS: new Operation({
        name: "queryTransactionStatus",
        method: "GET",
        port: "18353",
        path: "/ipg/v1x/queryTransactionStatus",
        input: {
          mapping: {
            reference: "input_QueryReference",
            conversation: "input_QueryReference",
            transaction: "input_QueryReference",
            from: "input_ServiceProviderCode",
            system: "input_ThirdPartyReference",
          },
          validation: {
            from: Pattern.PHONE_NUMBER,
            to: Pattern.SERVICE_PROVIDER_CODE,
            amount: Pattern.MONEY_AMOUNT,
            transaction: Pattern.WORD,
            reference: Pattern.WORD,
          },
          type: "query",
        },
        outputMapping: {},
      }),
      REVERSAL: new Operation({
        name: "reversal",
        method: "POST",
        port: "18354",
        path: "/ipg/v1x/reversal",
        input: {
          mapping: {
            from: "input_ServiceProviderCode",
            to: "input_CustomerMSISDN",
            amount: "input_Amount",
            transaction: "input_TransactionReference",
            reference: "input_ThirdPartyReference",
          },
          validation: {
            from: Pattern.PHONE_NUMBER,
            to: Pattern.SERVICE_PROVIDER_CODE,
            amount: Pattern.MONEY_AMOUNT,
            transaction: Pattern.WORD,
            reference: Pattern.WORD,
          },
          type: "body",
        },

        outputMapping: {},
      }),
      B2B_PAYMENT: new Operation({
        name: "b2bPayment",
        method: "GET",
        port: "18349",
        path: "/ipg/v1x/b2bPayment",
        input: {
          mapping: {
            from: "input_PrimaryPartyCode",
            to: "input_ReceiverPartyCode",
            amount: "input_Amount",
            transaction: "input_TransactionReference",
            reference: "input_ThirdPartyReference",
          },
          validation: {
            from: Pattern.SERVICE_PROVIDER_CODE,
            to: Pattern.SERVICE_PROVIDER_CODE,
            amount: Pattern.MONEY_AMOUNT,
            transaction: Pattern.WORD,
            reference: Pattern.WORD,
          },
          type: "body",
        },
        output: {},
      }),
      B2C_PAYMENT: new Operation({
        name: "b2cPayment",
        method: "GET",
        port: "18345",
        path: "/ipg/v1x/b2cPayment",
        input: {
          mapping: {
            from: "input_ServiceProviderCode",
            to: "input_CustomerMSISDN",
            amount: "input_Amount",
            transaction: "input_TransactionReference",
            reference: "input_ThirdPartyReference",
          },
          validation: {
            to: Pattern.PHONE_NUMBE,
            from: Pattern.SERVICE_PROVIDER_CODE,
            amount: Pattern.MONEY_AMOUNT,
            transaction: Pattern.WORD,
            reference: Pattern.WORD,
          },
          type: "body",
        },
        outputMapping: {},
      }),
    };
  }

  buildDefaultHeaders() {
    this.defaultHeaders = {
      Origin: this.origin,
      "User-Agent": this.userAgent,
    };
  }

  generateHeaders() {
    return {
      ...this.defaultHeaders,
      ...this.generateAuthorizationHeader(),
    };
  }

  generateURL(operation) {
    return `${this.environment.toURL()}${operation.toURL()}`;
  }

  generateBaseURL(operation) {
    return `${this.environment.toURL()}:${operation.port}`;
  }

  generateAccessToken() {
    const hasKeys =
      this.hasOwnProperty("apiKey") && this.hasOwnproperty("publicKey");
    const hasAccesToken = this.hasOwnProperty("accessToken");

    if (hasKeys) {
      this.auth = crypto.publicEncrypt();
      let buffer = Buffer.from(this.apiKey);
      let base64Key = `-----BEGIN PUBLIC KEY-----\n${this.publicKey}\n-----END PUBLIC KEY-----`;
      let key = crypto.createPublicKey(base64Key);

      this.auth = crypto.publicEncrypt({ key: key }, buffer);
    }

    if (hasAccessToken) {
      this.auth = this.accessToken;
    }
  }
}
