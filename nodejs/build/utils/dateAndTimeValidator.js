"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var DateAndTimeValidator = /*#__PURE__*/function () {
  function DateAndTimeValidator() {
    _classCallCheck(this, DateAndTimeValidator);
  }
  return _createClass(DateAndTimeValidator, [{
    key: "asDateString",
    value: function asDateString(date) {
      return "".concat(date.getFullYear(), "-").concat(this.padStartValue(date.getMonth() + 1), "-").concat(this.padStartValue(date.getDate()));
    }
  }, {
    key: "asTimeString",
    value: function asTimeString(date) {
      return "".concat(this.padStartValue(date.getHours()), ":").concat(this.padStartValue(date.getMinutes()), ":").concat(this.padStartValue(date.getSeconds()));
    }
  }, {
    key: "padStartValue",
    value: function padStartValue(value) {
      return value.toString().padStart(2, "0");
    }
  }, {
    key: "isDateInThePast",
    value: function isDateInThePast(currDate, givenDate) {
      return givenDate < currDate ? true : false;
    }
  }]);
}();
module.exports = new DateAndTimeValidator();