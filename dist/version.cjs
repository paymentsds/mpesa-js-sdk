"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Version = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Version = /*#__PURE__*/function () {
  function Version(major, minor, patch) {
    _classCallCheck(this, Version);

    this.major = major;
    this.minor = minor;
    this.patch = patch;
  }

  _createClass(Version, [{
    key: "toString",
    value: function toString() {
      return "".concat(this.major, ".").concat(this.minor, ".").concat(this.patch);
    }
  }]);

  return Version;
}();

exports.Version = Version;