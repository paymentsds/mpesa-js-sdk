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
    POST: "post",
  },
  HEADER: {
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
  domain: "api.mpesa.vm.co.mz",
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
    path: "/ipg/v1x/",
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
    port: "18352",
    path: "/ipg/v1x/",
    mapping: {
      number: "input_CustomerMSISDN",
      from: "input_CustomerMSISDN",
      to: "input_ServiceProviderCode",
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
    port: "18352",
    path: "/ipg/v1x/",
    mapping: {
      number: "input_CustomerMSISDN",
      from: "input_CustomerMSISDN",
      to: "input_ServiceProviderCode",
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
    method: HTTP.METHOD.POST,
    port: "18352",
    path: "/ipg/v1x/",
    mapping: {
      from: PATTERNS.PHONE_NUMBER,
      to: "input_ServiceProviderCode",
      amount: "input_Amount",
      transaction: "input_TransactionReference",
      reference: "input_ThirdPartyReference",
    },
    validation: {},
    required: [],
    optional: [],
  }),

  [QUERY_TRANSACTION_STATUS]: new Operation({
    method: HTTP.METHOD.GET,
    port: "18352",
    path: "/ipg/v1x/",
    mapping: {
      number: "input_CustomerMSISDN",
      from: "input_CustomerMSISDN",
      to: "input_ServiceProviderCode",
      amount: "input_Amount",
      transaction: "input_TransactionReference",
      reference: "input_ThirdPartyReference",
    },
    validation: {},
    required: [],
    optional: [],
  }),
};

export {
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
};
