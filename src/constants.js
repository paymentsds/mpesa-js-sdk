import { Operation } from "./operation.js";
import { Version } from "./version.js";
import { Environment } from "./environment.js";

const USER_AGENT = "MPesa";
const C2B_PAYMENT = "C2B_PAYMENT";
const B2B_PAYMENT = "B2B_PAYMENT";
const B2C_PAYMENT = "B2C_PAYMENT";
const REVERSAL = "REVERSAL";
const QUERY_TRANSACTION_STATUS = "QUERY_TRANSACTION_STATUS";

const VERSION = new Version(0, 1, 0);

const HTTP = {
  METHOD: {
    GET: "get",
    PUT: "put",
    POST: "post",
  },
  HEADERS: {
    USER_AGENT: "User-Agent",
    CONTENT_TYPE: "Content-Type",
    ORIGIN: "Origin",
    AUTHORIZATION: "Authorization",
  },
};

const SANDBOX = new Environment({
  scheme: "https",
  domain: "api.sandbox.vm.co.mz",
});

const PRODUCTION = new Environment({
  scheme: "https",
  domain: "api.vm.co.mz",
});

const PATTERNS = {
  PHONE_NUMBER: /^((00|\+)?(258))?8[45][0-9]{7}$/,
  MONEY_AMOUNT: /^[1-9][0-9]*(\.[0-9]+)?$/,
  WORD: /^\w+$/,
  SERVICE_PROVIDER_CODE: /^[0-9]{5,6}$/,
};

const OPERATIONS = {
  [C2B_PAYMENT]: new Operation({
    method: HTTP.METHOD.POST,
    port: "18352",
    path: "/ipg/v1x/c2bPayment/singleStage/",
    mapping: {
      from: "input_CustomerMSISDN",
      to: "input_ServiceProviderCode",
      amount: "input_Amount",
      transaction: "input_TransactionReference",
      reference: "input_ThirdPartyReference",
    },
    validation: {
      from: PATTERNS.PHONE_NUMBER,
      to: PATTERNS.SERVICE_PROVIDER_CODE,
      amount: PATTERNS.MONEY_AMOUNT,
      transaction: PATTERNS.WORD,
      reference: PATTERNS.WORD,
    },
    required: ["to", "from", "amount", "transaction", "reference"],
    optional: ["from"],
  }),

  [B2B_PAYMENT]: new Operation({
    method: HTTP.METHOD.POST,
    port: "18349",
    path: "/ipg/v1x/b2bPayment/",
    mapping: {
      from: "input_PrimaryPartyCode",
      to: "input_ReceiverPartyCode",
      amount: "input_Amount",
      transaction: "input_TransactionReference",
      reference: "input_ThirdPartyReference",
    },
    validation: {
      from: PATTERNS.SERVICE_PROVIDER_CODE,
      to: PATTERNS.SERVICE_PROVIDER_CODE,
      amount: PATTERNS.MONEY_AMOUNT,
      transaction: PATTERNS.WORD,
      reference: PATTERNS.WORD,
    },
    required: ["to", "from", "amount", "transaction", "reference"],
    optional: ["from"],
  }),

  [B2C_PAYMENT]: new Operation({
    method: HTTP.METHOD.POST,
    port: "18345",
    path: "/ipg/v1x/b2cPayment/",
    mapping: {
      number: "input_CustomerMSISDN",
      to: "input_CustomerMSISDN",
      from: "input_ServiceProviderCode",
      amount: "input_Amount",
      transaction: "input_TransactionReference",
      reference: "input_ThirdPartyReference",
    },
    validation: {
      from: PATTERNS.SERVICE_PROVIDER_CODE,
      to: PATTERNS.PHONE_NUMBER,
      amount: PATTERNS.MONEY_AMOUNT,
      transaction: PATTERNS.WORD,
      reference: PATTERNS.WORD,
    },
    required: ["to", "from", "amount", "transaction", "reference"],
    optional: ["to"],
  }),

  [REVERSAL]: new Operation({
    method: HTTP.METHOD.PUT,
    port: "18354",
    path: "/ipg/v1x/reversal/",
    mapping: {
      to: "input_ServiceProviderCode",
      amount: "input_Amount",
      reference: "input_ThirdPartyReference",
      transaction: "input_TransactionID",
      securityCredential: "input_SecurityCredential",
      initiatorIdentifier: "input_InitiatorIdentifier",
    },
    validation: {
      to: PATTERNS.SERVICE_PROVIDER_CODE,
      amount: PATTERNS.MONEY_AMOUNT,
      reference: PATTERNS.WORD,
      transaction: PATTERNS.WORD,
      securityCredential: PATTERNS.WORD,
      initiatorIdentifier: PATTERNS.WORD,
    },
    required: [
      "to",
      "amount",
      "reference",
      "transaction",
      "securityCredential",
      "initiatorIdentifier",
    ],
    optional: ["to", "securityCredential", "initiatorIdentifier"],
  }),

  [QUERY_TRANSACTION_STATUS]: new Operation({
    method: HTTP.METHOD.GET,
    port: "18353",
    path: "/ipg/v1x/queryTransactionStatus/",
    mapping: {
      from: "input_ServiceProviderCode",
      subject: "input_QueryReference",
      reference: "input_ThirdPartyReference",
    },
    validation: {
      from: PATTERNS.SERVICE_PROVIDER_CODE,
      subject: PATTERNS.WORD,
      reference: PATTERNS.WORD,
    },
    required: ["from", "subject", "reference"],
    optional: ["from"],
  }),
};

const ERRORS = {
  VALIDATION: {
    code: 3000,
    description: "The data provider is not valid",
  },
  MISSING: {
    code: 3001,
    description: "There are attributes missing to complete the transaction",
  },
  AUTHENTICATION: {
    code: 3002,
    description: "There is not a public key and API key or access token set",
  },
  INVALID_OPERATION: {
    code: 3003,
    descrition: "Unable to detect the operation from the destination number",
  },
  INVALID_ENV: {
    code: 3003,
    descrition: "Unable to detect the base URL",
  },
};

export {
  ERRORS,
  PATTERNS,
  C2B_PAYMENT,
  B2B_PAYMENT,
  B2C_PAYMENT,
  REVERSAL,
  QUERY_TRANSACTION_STATUS,
  OPERATIONS,
  PRODUCTION,
  SANDBOX,
  VERSION,
  USER_AGENT,
  HTTP,
};
