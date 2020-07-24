"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Response = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Response = function Response(status, code, description, data) {
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
};

exports.Response = Response;