"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Configuration = void 0;

var _crypto = _interopRequireDefault(require("crypto"));

var _environment = require("./environment.cjs");

var _constants = require("./constants.cjs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Configuration = /*#__PURE__*/function () {
  function Configuration(args) {
    _classCallCheck(this, Configuration);

    this.environment = _constants.SANDBOX;
    this.verifySSL = false;
    this.timeout = 0;
    this.debugging = true;
    this.origin = "*";
    this.userAgent = "".concat(_constants.USER_AGENT, "/").concat(_constants.VERSION.toString());

    if (args !== null && args !== undefined) {
      var _iterator = _createForOfIteratorHelper(Configuration.PARAMS),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var key = _step.value;

          if (Object.prototype.hasOwnProperty.call(args, key)) {
            if (key === "host") {
              this.environment = _environment.Environment.fromURL(args[key]);
            } else {
              this[key] = args[key];
            }
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }

  _createClass(Configuration, [{
    key: "generateURL",
    value: function generateURL(operation) {
      return "".concat(this.environment.toURL()).concat(operation.toURL());
    }
  }, {
    key: "generateBaseURL",
    value: function generateBaseURL(operation) {
      return "".concat(this.environment.toURL(), ":").concat(operation.port);
    }
  }, {
    key: "generateAccessToken",
    value: function generateAccessToken() {
      var hasKeys = Object.prototype.hasOwnProperty.call(this, "apiKey") && Object.prototype.hasOwnProperty.call(this, "publicKey");
      var hasAccessToken = Object.prototype.hasOwnProperty.call(this, "accessToken");

      if (hasKeys) {
        var publicKey = formatPublicKey(this.publicKey);
        var apiKeyBuffer = Buffer.from(this.apiKey);

        var encryptedApiKey = _crypto["default"].publicEncrypt({
          key: publicKey,
          padding: _crypto["default"].constants.RSA_PKCS1_PADDING
        }, apiKeyBuffer);

        this.auth = encryptedApiKey.toString("base64");
      }

      if (hasAccessToken) {
        this.auth = this.accessToken;
      }

      function formatPublicKey(publicKey) {
        var header = "-----BEGIN PUBLIC KEY-----";
        var footer = "-----END PUBLIC KEY-----";
        return "".concat(header, "\n").concat(publicKey, "\n").concat(footer);
      }
    }
  }]);

  return Configuration;
}();

exports.Configuration = Configuration;
Configuration.PARAMS = ["host", "apiKey", "publicKey", "accessToken", "verifySSL", "timeout", "debugging", "userAgent", "origin", "securityCredential", "serviceProviderCode", "initiatorIdentifier"];