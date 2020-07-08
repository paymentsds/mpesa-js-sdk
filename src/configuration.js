import crypto from "crypto";

import { Pattern } from "./pattern.js";
import { Environment } from "./environment.js";
import { Operation } from "./operation.js";
import { PRODUCTION, SANDBOX, USER_AGENT, VERSION } from "./constants.js";

export class Configuration {
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
    this.environment = SANDBOX;
    this.verifySSL = false;
    this.timeout = 0;
    this.debugging = true;
    this.origin = "*";
    this.userAgent = `${USER_AGENT}/${VERSION}`;

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
      let key = crypto.createPublicKey(base64Key);

      this.auth = crypto.publicEncrypt({ key: key }, buffer);
    }

    if (hasAccessToken) {
      this.auth = this.accessToken;
    }
  }
}
