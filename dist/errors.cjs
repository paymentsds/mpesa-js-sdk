"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValidationError = exports.TimeoutError = exports.MissingPropertiesError = exports.InvalidReceiverError = exports.InvalidHostError = exports.AuthenticationError = void 0;

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var MissingPropertiesError = /*#__PURE__*/function (_Error) {
  _inherits(MissingPropertiesError, _Error);

  var _super = _createSuper(MissingPropertiesError);

  function MissingPropertiesError(name, message) {
    var _this;

    _classCallCheck(this, MissingPropertiesError);

    _this = _super.call(this);
    _this.name = name || "MissingPropertiesError";
    _this.message = message || "There are attributes missing to complete the transaction";
    return _this;
  }

  return _createClass(MissingPropertiesError);
}( /*#__PURE__*/_wrapNativeSuper(Error));

exports.MissingPropertiesError = MissingPropertiesError;

var AuthenticationError = /*#__PURE__*/function (_Error2) {
  _inherits(AuthenticationError, _Error2);

  var _super2 = _createSuper(AuthenticationError);

  function AuthenticationError(name, message) {
    var _this2;

    _classCallCheck(this, AuthenticationError);

    _this2 = _super2.call(this);
    _this2.name = name || "AuthenticationError";
    _this2.message = message || "There is not a public key and API key or access token set";
    return _this2;
  }

  return _createClass(AuthenticationError);
}( /*#__PURE__*/_wrapNativeSuper(Error));

exports.AuthenticationError = AuthenticationError;

var InvalidReceiverError = /*#__PURE__*/function (_Error3) {
  _inherits(InvalidReceiverError, _Error3);

  var _super3 = _createSuper(InvalidReceiverError);

  function InvalidReceiverError(name, message) {
    var _this3;

    _classCallCheck(this, InvalidReceiverError);

    _this3 = _super3.call(this);
    _this3.name = name || "InvalidReceiverError";
    _this3.message = message || "The receiver does not look like a valid phone number nor a valid service provider code";
    return _this3;
  }

  return _createClass(InvalidReceiverError);
}( /*#__PURE__*/_wrapNativeSuper(Error));

exports.InvalidReceiverError = InvalidReceiverError;

var ValidationError = /*#__PURE__*/function (_Error4) {
  _inherits(ValidationError, _Error4);

  var _super4 = _createSuper(ValidationError);

  function ValidationError(name, message) {
    var _this4;

    _classCallCheck(this, ValidationError);

    _this4 = _super4.call(this);
    _this4.name = name || "ValidationError";
    _this4.message = message || "The data provider is not valid";
    return _this4;
  }

  return _createClass(ValidationError);
}( /*#__PURE__*/_wrapNativeSuper(Error));

exports.ValidationError = ValidationError;

var InvalidHostError = /*#__PURE__*/function (_Error5) {
  _inherits(InvalidHostError, _Error5);

  var _super5 = _createSuper(InvalidHostError);

  function InvalidHostError(name, message) {
    var _this5;

    _classCallCheck(this, InvalidHostError);

    _this5 = _super5.call(this);
    _this5.name = name || "InvalidHostError";
    _this5.message = message || "The provider host is not valid";
    return _this5;
  }

  return _createClass(InvalidHostError);
}( /*#__PURE__*/_wrapNativeSuper(Error));

exports.InvalidHostError = InvalidHostError;

var TimeoutError = /*#__PURE__*/function (_Error6) {
  _inherits(TimeoutError, _Error6);

  var _super6 = _createSuper(TimeoutError);

  function TimeoutError(name, message) {
    var _this6;

    _classCallCheck(this, TimeoutError);

    _this6 = _super6.call(this);
    _this6.name = name || "TimeoutError";
    _this6.message = message || "The request has taken more time than allowed";
    return _this6;
  }

  return _createClass(TimeoutError);
}( /*#__PURE__*/_wrapNativeSuper(Error));

exports.TimeoutError = TimeoutError;