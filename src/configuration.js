import crypto from "crypto";

import { Environment } from "./environment.js";
import { SANDBOX, USER_AGENT, VERSION } from "./constants.js";

class Configuration {
  constructor(args) {
    this.environment = SANDBOX;
    this.verifySSL = false;
    this.timeout = 0;
    this.debugging = true;
    this.origin = "*";
    this.userAgent = `${USER_AGENT}/${VERSION.toString()}`;

    if (args !== null && args !== undefined) {
      for (const key of Configuration.PARAMS) {
        if (Object.prototype.hasOwnProperty.call(args, key)) {
          if (key === "host") {
            this.environment = Environment.fromURL(args[key]);
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
      Object.prototype.hasOwnProperty.call(this, "apiKey") &&
      Object.prototype.hasOwnProperty.call(this, "publicKey");
    const hasAccessToken = Object.prototype.hasOwnProperty.call(this, "accessToken");

    if (hasKeys) {
      const publicKey = formatPublicKey(this.publicKey);
      const apiKeyBuffer = Buffer.from(this.apiKey);

      const encryptedApiKey = crypto.publicEncrypt(
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

Configuration.PARAMS = [
  "host",
  "apiKey",
  "publicKey",
  "accessToken",
  "verifySSL",
  "timeout",
  "debugging",
  "userAgent",
  "origin",
  "securityCredential",
  "serviceProviderCode",
  "initiatorIdentifier",
];

export { Configuration };
