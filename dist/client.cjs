"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Client = void 0;

var _service = require("./service.cjs");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Client = /*#__PURE__*/function () {
  function Client(args) {
    _classCallCheck(this, Client);

    this.service = new _service.Service(args);
  }
  /**
   * Sends money to mobile or business wallet
   * @param {Object.<string, string>} data
   */


  _createClass(Client, [{
    key: "send",
    value: function send(data) {
      return this.service.handleSend(data);
    }
    /**
     * Receives money from a mobile wallet
     * @param {Object.<string, string>} data
     */

  }, {
    key: "receive",
    value: function receive(data) {
      return this.service.handleReceive(data);
    }
    /**
     * Reverts a successful transaction
     * @param {Object.<string, string>} data
     */

  }, {
    key: "revert",
    value: function revert(data) {
      return this.service.handleRevert(data);
    }
    /**
     * Queries the status of a given transaction
     * @param {Object.<string, string>} data
     */

  }, {
    key: "query",
    value: function query(data) {
      return this.service.handleQuery(data);
    }
  }]);

  return Client;
}();

exports.Client = Client;