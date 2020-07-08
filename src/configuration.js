import crypto from "crypto";

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
      this.hasOwnProperty("apiKey") && this.hasOwnProperty("publicKey");
    const hasAccessToken = this.hasOwnProperty("accessToken");

    if (hasKeys) {
      let publicKey = formatPublicKey(this.publicKey);
      let apiKeyBuffer = Buffer.from(this.apiKey);

      let encryptedApiKey = crypto.publicEncrypt(
        {
          key: publicKey,
          padding: crypto.constants.RSA_PKCS1_PADDING,
        },
        apiKeyBuffer
      );

      this.auth = encryptedApiKey.toString("base64");
    }

    if (hasAccessToken) {
      this.auth = this.accessToken;
    }

    function formatPublicKey(publicKey) {
      const header = "-----BEGIN PUBLIC KEY-----";
      const footer = "-----END PUBLIC KEY-----";

      return `${header}\n${publicKey}\n${footer}`;
    }
  }
}
