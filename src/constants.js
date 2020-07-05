import { Operation } from "./operation.js";

const C2B_PAYMENT = "C2B_PAYMENT";
const B2B_PAYMENT = "C2B_PAYMENT";
const B2C_PAYMENT = "C2B_PAYMENT";
const REVERSAL = "C2B_PAYMENT";
const QUERY_TRANSACTION_STATUS = "C2B_PAYMENT";

const GET = "get";

const POST = "post";

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

const PATTERNS = {
  PHONE_NUMBER: /^((00|\+)?(258))?8[45][0-9]{7}$/,
  MONEY_AMOUNT: /^[1-9][0-9]*(\.[0-9]+)?$/,
  WORD: /^\w+$/,
  SERVICE_PROVIDER_CODE: /^[0-9]{5,6}$/,
};

const OPERATIONS = {
  [C2B_PAYMENT]: new Operation({
    method: "get",
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

  [B2B_PAYMENT]: new Operation({
    method: POST,
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
      from: PATTERNS.PHONE_NUMBER,
      to: PATTERNS.SERVICE_PROVIDER_CODE,
      amount: PATTERNS.MONEY_AMOUNT,
      transaction: PATTERNS.WORD,
      reference: PATTERNS.WORD,
    },
    required: [],
    optional: [],
  }),

  [B2C_PAYMENT]: new Operation({
    method: POST,
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

  [REVERSAL]: new Operation({
    method: POST,
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

  [QUERY_TRANSACTION_STATUS]: new Operation({
    method: GET,
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
};
