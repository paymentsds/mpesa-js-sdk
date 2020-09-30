"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Service = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _configuration = require("./configuration.cjs");

var _errors = require("./errors.cjs");

var _constants = require("./constants.cjs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _wrapRegExp(re, groups) { _wrapRegExp = function _wrapRegExp(re, groups) { return new BabelRegExp(re, undefined, groups); }; var _RegExp = _wrapNativeSuper(RegExp); var _super = RegExp.prototype; var _groups = new WeakMap(); function BabelRegExp(re, flags, groups) { var _this = _RegExp.call(this, re, flags); _groups.set(_this, groups || _groups.get(re)); return _this; } _inherits(BabelRegExp, _RegExp); BabelRegExp.prototype.exec = function (str) { var result = _super.exec.call(this, str); if (result) result.groups = buildGroups(result, this); return result; }; BabelRegExp.prototype[Symbol.replace] = function (str, substitution) { if (typeof substitution === "string") { var groups = _groups.get(this); return _super[Symbol.replace].call(this, str, substitution.replace(/\$<([^>]+)>/g, function (_, name) { return "$" + groups[name]; })); } else if (typeof substitution === "function") { var _this = this; return _super[Symbol.replace].call(this, str, function () { var args = []; args.push.apply(args, arguments); if (_typeof(args[args.length - 1]) !== "object") { args.push(buildGroups(args, _this)); } return substitution.apply(this, args); }); } else { return _super[Symbol.replace].call(this, str, substitution); } }; function buildGroups(result, re) { var g = _groups.get(re); return Object.keys(g).reduce(function (groups, name) { groups[name] = result[g[name]]; return groups; }, Object.create(null)); } return _wrapRegExp.apply(this, arguments); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Service = /*#__PURE__*/function () {
  function Service(args) {
    _classCallCheck(this, Service);

    this.initDefaultConfigs(args);
  }
  /**
   * Initializes default configurations
   * @param {Object} args
   */


  _createClass(Service, [{
    key: "initDefaultConfigs",
    value: function initDefaultConfigs(args) {
      this.config = new _configuration.Configuration(args);
    }
    /**
     *
     * @param {Object} intent
     */

  }, {
    key: "handleSend",
    value: function handleSend(intent) {
      var opcode = this.detectOperation(intent);
      return this.handleRequest(opcode, intent);
    }
  }, {
    key: "handleReceive",
    value: function handleReceive(intent) {
      return this.handleRequest(_constants.C2B_PAYMENT, intent);
    }
  }, {
    key: "handleRevert",
    value: function handleRevert(intent) {
      return this.handleRequest(_constants.REVERSAL, intent);
    }
  }, {
    key: "handleQuery",
    value: function handleQuery(intent) {
      return this.handleRequest(_constants.QUERY_TRANSACTION_STATUS, intent);
    }
    /**
     * Validates transaction data and performs performs the needed HTTP request
     * @param {string} opcode
     * @param {Object.<string, string>} intent
     */

  }, {
    key: "handleRequest",
    value: function handleRequest(opcode, intent) {
      var data = this.fillOptionalProperties(opcode, intent);
      var missingProperties = this.detectMissingProperties(opcode, intent);

      if (missingProperties.length > 0) {
        throw new _errors.MissingPropertiesError();
      }

      var validationErrors = this.detectErrors(opcode, data);

      if (validationErrors.length > 0) {
        throw new _errors.ValidationError();
      }

      return this.performRequest(opcode, intent);
    }
    /**
     * Detects the operation from the transaction data
     * @param {Object.<string, string>} intent
     */

  }, {
    key: "detectOperation",
    value: function detectOperation(intent) {
      if (Object.prototype.hasOwnProperty.call(intent, "to")) {
        if (_constants.PATTERNS.PHONE_NUMBER.test(intent.to)) {
          return _constants.B2C_PAYMENT;
        }

        if (_constants.PATTERNS.SERVICE_PROVIDER_CODE.test(intent.to)) {
          return _constants.B2B_PAYMENT;
        }
      }

      throw new _errors.InvalidReceiverError();
    }
    /**
     * Detect validation errors from thransaction data
     * @param {string} opcode
     * @param {Object.<string, string>} intent
     */

  }, {
    key: "detectErrors",
    value: function detectErrors(opcode, intent) {
      var operations = _constants.OPERATIONS[opcode];
      var errors = operations.required.filter(function (e) {
        var pattern = operations.validation[e];
        return !pattern.test(intent[e]);
      });
      return errors;
    }
    /**
     * Detects missing properties from transaction data
     * @param {string} opcode
     * @param {Object.<string, string>} data
     */

  }, {
    key: "detectMissingProperties",
    value: function detectMissingProperties(opcode, data) {
      var required = _constants.OPERATIONS[opcode].required;
      var missing = required.filter(function (e) {
        return !Object.prototype.hasOwnProperty.call(data, e);
      });
      return missing;
    }
    /**
     * Complete transaction data from configuration data if it is not already provided
     * @param {string} opcode
     * @param {Object.<string,string>} intent
     */

  }, {
    key: "fillOptionalProperties",
    value: function fillOptionalProperties(opcode, intent) {
      var self = this;

      function map(correspondences) {
        for (var k in correspondences) {
          if (!Object.prototype.hasOwnProperty.call(intent, k) && Object.prototype.hasOwnProperty.call(self.config, correspondences[k])) {
            intent[k] = self.config[correspondences[k]];
          }
        }

        return intent;
      }

      switch (opcode) {
        case _constants.C2B_PAYMENT:
          return map({
            to: "serviceProviderCode"
          });

        case _constants.B2C_PAYMENT:
        case _constants.B2B_PAYMENT:
          return map({
            from: "serviceProviderCode"
          });

        case _constants.REVERSAL:
          return map({
            initiatorIdentifier: "initiatorIdentifier",
            securityCredential: "securityCredential",
            to: "serviceProviderCode"
          });

        case _constants.QUERY_TRANSACTION_STATUS:
          return map({
            from: "serviceProviderCode"
          });
      }

      return intent;
    }
    /**
     * Formats transaction data to the format required by M-Pesa API
     * @param {string} opcode
     * @param {Object.<string,string>} intent
     */

  }, {
    key: "buildRequestBody",
    value: function buildRequestBody(opcode, intent) {
      var body = {};

      for (var oldKey in intent) {
        var newKey = _constants.OPERATIONS[opcode].mapping[oldKey];

        if (opcode === _constants.C2B_PAYMENT && oldKey === "from" || opcode === _constants.B2C_PAYMENT && oldKey == "to") {
          body[newKey] = this.normalizePhoneNumber(intent[oldKey]);
        } else {
          body[newKey] = intent[oldKey];
        }
      }

      return body;
    }
    /**
     * Generates HTTP headers required to perform the request
     * @param {string} opcode
     * @param {Object.<string,string>} intent
     */

  }, {
    key: "buildRequestHeaders",
    value: function buildRequestHeaders(opcode, intent) {
      var _headers;

      var headers = (_headers = {}, _defineProperty(_headers, _constants.HTTP.HEADERS.USER_AGENT, this.config.userAgent), _defineProperty(_headers, _constants.HTTP.HEADERS.ORIGIN, this.config.origin), _defineProperty(_headers, _constants.HTTP.HEADERS.CONTENT_TYPE, "application/json"), _defineProperty(_headers, _constants.HTTP.HEADERS.AUTHORIZATION, "Bearer ".concat(this.config.auth)), _headers);
      return headers;
    }
  }, {
    key: "performRequest",
    value: function performRequest(opcode, intent) {
      this.generateAccessToken();

      if (Object.prototype.hasOwnProperty.call(this.config, "environment")) {
        if (Object.prototype.hasOwnProperty.call(this.config, "auth")) {
          var operation = _constants.OPERATIONS[opcode];
          var headers = this.buildRequestHeaders(opcode, intent);
          var body = this.buildRequestBody(opcode, intent);
          var requestData = {
            baseURL: "".concat(this.config.environment.scheme, "://").concat(this.config.environment.domain, ":").concat(operation.port),
            url: operation.path,
            method: operation.method,
            path: operation.path,
            headers: headers,
            timeout: this.config.timeout * 1000,
            maxRedirects: 0
          };

          if (operation.method === _constants.HTTP.METHOD.GET) {
            requestData.params = body;
          } else {
            requestData.data = body;
          }

          var self = this;
          return (0, _axios["default"])(requestData).then(function (r) {
            return Promise.resolve(self.buildResponse(r));
          })["catch"](function (e) {
            return Promise.reject(self.buildResponse(e));
          });
        }

        throw new _errors.AuthenticationError();
      } else {
        throw new _errors.InvalidHostError();
      }
    }
    /**
     * Formats the result
     * @param {*} result
     */

  }, {
    key: "buildResponse",
    value: function buildResponse(result) {
      if (result.status >= 200 && result.status < 300) {
        return {
          response: {
            status: result.status,
            code: result.data.output_ResponseCode,
            desc: result.data.output_ResponseDesc
          },
          conversation: result.data.output_ConversationID,
          transaction: result.data.output_TransactionID,
          reference: result.data.output_ThirdPartyReference
        };
      }

      return {
        response: {
          status: result.response.status,
          statusText: result.response.statusText,
          outputError: result.response.data.output_error
        }
      };
    }
    /**
     * Generates access token from public key and API key pair
     */

  }, {
    key: "generateAccessToken",
    value: function generateAccessToken() {
      this.config.generateAccessToken();
    }
  }, {
    key: "normalizePhoneNumber",
    value: function normalizePhoneNumber(phoneNumber) {
      var phoneNumberCountryCode = /*#__PURE__*/_wrapRegExp(/^(((00?|\+)?258)?)(8[45][0-9]{7})$/, {
        prefix: 2,
        localNumber: 4
      });

      return "258".concat(phoneNumber.match(phoneNumberCountryCode).groups.localNumber);
    }
  }]);

  return Service;
}();

exports.Service = Service;