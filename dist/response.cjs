"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Response = void 0;

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Response = /*#__PURE__*/_createClass(function Response(status, code, description, data) {
  _classCallCheck(this, Response);

  this.status = status;
  this.code = code;
  this.description = description;
  this.data = data;

  if (this.status >= 100 && this.status < 300) {
    this.success = true;
  } else {
    this.success = false;
  }
});

exports.Response = Response;