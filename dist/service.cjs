"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Service = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _configuration = require("./configuration.cjs");

var _response = require("./response.cjs");

var _errors = require("./errors.cjs");

var _constants = require("./constants.cjs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Service = /*#__PURE__*/function () {
  function Service(args) {
    _classCallCheck(this, Service);

    this.initDefaultConfigs(args);
  }

  _createClass(Service, [{
    key: "initDefaultConfigs",
    value: function initDefaultConfigs(args) {
      this.config = new _configuration.Configuration(args);
    }
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
  }, {
    key: "detectMissingProperties",
    value: function detectMissingProperties(opcode, data) {
      var required = _constants.OPERATIONS[opcode].required;
      var missing = required.filter(function (e) {
        return !Object.prototype.hasOwnProperty.call(data, e);
      });
      return missing;
    }
  }, {
    key: "fillOptionalProperties",
    value: function fillOptionalProperties(opcode, intent) {
      function map(correspondences) {
        for (var k in correspondences) {
          if (!Object.prototype.hasOwnProperty.call(intent, k) && Object.prototype.hasOwnProperty.call(this.config, correspondences[k])) {
            intent[k] = this.config[correspondences[k]];
          }
        }

        return intent;
      }

      switch (opcode) {
        case _constants.C2B_PAYMENT:
        case _constants.B2B_PAYMENT:
          return map({
            to: "service_provider_code"
          });

        case _constants.B2C_PAYMENT:
          return map({
            from: "service_provider_code"
          });

        case _constants.REVERSAL:
          return map({
            initiator_identifier: "initiator_identifier",
            security_credential: "security_credential"
          });

        case _constants.QUERY_TRANSACTION_STATUS:
          return map({
            to: "service_provider_code"
          });
      }

      return intent;
    }
  }, {
    key: "buildRequestBody",
    value: function buildRequestBody(opcode, intent) {
      var body = {};

      for (var oldKey in intent) {
        var newKey = _constants.OPERATIONS[opcode].mapping[oldKey];
        body[newKey] = intent[oldKey];
      }

      return body;
    }
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
            headers: headers
          };

          if (operation.method === _constants.HTTP.METHOD.POST) {
            requestData.data = body;
          } else {
            requestData.params = body;
          }

          var self = this;
          return (0, _axios["default"])(requestData).then(function (r) {
            return Promise.resolve(self.buildResponse(r));
          })["catch"](function (e) {
            return Promise.reject(self.buildResponse(e.response));
          });
        }

        throw new _errors.AuthenticationError();
      } else {
        throw new _errors.InvalidHostError();
      }
    }
  }, {
    key: "buildResponse",
    value: function buildResponse(result) {
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
  }, {
    key: "generateAccessToken",
    value: function generateAccessToken() {
      this.config.generateAccessToken();
    }
  }]);

  return Service;
}();

exports.Service = Service;