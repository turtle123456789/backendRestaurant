"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _index = _interopRequireDefault(require("../models/index"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var _require = require("sequelize"),
  Op = _require.Op;
var moment = require("moment");
var getAllTables = function getAllTables() {
  return new Promise( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(resolve, reject) {
      var tables;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _index["default"].Table.findAll({
              raw: true
            });
          case 3:
            tables = _context.sent;
            resolve({
              data: tables
            });
            _context.next = 10;
            break;
          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            reject(_context.t0);
          case 10:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 7]]);
    }));
    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};
var checkExistTable = function checkExistTable(name, restaurantId) {
  return new Promise( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(resolve, reject) {
      var res;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _index["default"].Table.findOne({
              where: {
                name: name,
                restaurantId: restaurantId
              }
            });
          case 3:
            res = _context2.sent;
            if (res) {
              resolve(true);
            } else {
              resolve(false);
            }
            _context2.next = 10;
            break;
          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            reject(_context2.t0);
          case 10:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 7]]);
    }));
    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());
};
var createNewTable = function createNewTable(data) {
  return new Promise( /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(resolve, reject) {
      var isExistTable, table;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return checkExistTable(data.name, data.restaurantId);
          case 3:
            isExistTable = _context3.sent;
            if (!isExistTable) {
              _context3.next = 6;
              break;
            }
            return _context3.abrupt("return", resolve({
              status: 400,
              message: "Table name is exist, please enter other table",
              data: ""
            }));
          case 6:
            _context3.next = 8;
            return _index["default"].Table.create({
              name: data.name,
              capacity: data.capacity,
              position: data.position,
              description: data.description,
              orderId: 0,
              restaurantId: data.restaurantId
            });
          case 8:
            table = _context3.sent;
            return _context3.abrupt("return", resolve({
              status: 201,
              message: "OK",
              data: table
            }));
          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](0);
            reject(_context3.t0);
          case 15:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[0, 12]]);
    }));
    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());
};
var deleteTable = function deleteTable(data) {
  return new Promise( /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(resolve, reject) {
      var table;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _index["default"].Table.findOne({
              where: {
                id: data.id
              }
            });
          case 3:
            table = _context4.sent;
            if (table) {
              _context4.next = 6;
              break;
            }
            return _context4.abrupt("return", resolve({
              status: 404,
              message: "table is not exist!",
              data: ""
            }));
          case 6:
            if (!(table.orderId !== 0)) {
              _context4.next = 8;
              break;
            }
            return _context4.abrupt("return", resolve({
              status: 400,
              message: "Table is in used, can not delete!",
              data: ""
            }));
          case 8:
            _context4.next = 10;
            return _index["default"].Table.destroy({
              where: {
                id: data.id
              }
            });
          case 10:
            return _context4.abrupt("return", resolve({
              status: 200,
              message: "table is deleted",
              data: ""
            }));
          case 13:
            _context4.prev = 13;
            _context4.t0 = _context4["catch"](0);
            reject(_context4.t0);
          case 16:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[0, 13]]);
    }));
    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }());
};
var getAllTablesByRestaurantId = function getAllTablesByRestaurantId(data) {
  return new Promise( /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(resolve, reject) {
      var tables;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            if (!data.restaurantId) {
              resolve({
                status: 400,
                message: "Missing required parameter",
                data: ""
              });
            }
            _context5.next = 4;
            return _index["default"].Table.findAll({
              where: {
                restaurantId: data.restaurantId
              },
              raw: true
            });
          case 4:
            tables = _context5.sent;
            resolve({
              status: 200,
              message: "OK",
              data: tables
            });
            _context5.next = 11;
            break;
          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](0);
            reject(_context5.t0);
          case 11:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[0, 8]]);
    }));
    return function (_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }());
};
var updateTableData = function updateTableData(data) {
  return new Promise( /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(resolve, reject) {
      var table, key;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            if (data.id) {
              _context6.next = 3;
              break;
            }
            return _context6.abrupt("return", resolve({
              status: 400,
              message: "Missing required parameter",
              data: ""
            }));
          case 3:
            _context6.next = 5;
            return _index["default"].Table.findOne({
              where: {
                id: data.id
              },
              raw: false
            });
          case 5:
            table = _context6.sent;
            if (!table) {
              _context6.next = 13;
              break;
            }
            for (key in data) {
              if (key !== "id") {
                table[key] = data[key];
              }
            }
            _context6.next = 10;
            return table.save();
          case 10:
            return _context6.abrupt("return", resolve({
              status: 200,
              message: "Update the table succeeds!",
              table: table
            }));
          case 13:
            return _context6.abrupt("return", resolve({
              status: 404,
              message: "Table is not exist",
              data: ""
            }));
          case 14:
            _context6.next = 19;
            break;
          case 16:
            _context6.prev = 16;
            _context6.t0 = _context6["catch"](0);
            reject(_context6.t0);
          case 19:
          case "end":
            return _context6.stop();
        }
      }, _callee6, null, [[0, 16]]);
    }));
    return function (_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }());
};
var getDetailTableById = function getDetailTableById(tableId) {
  return new Promise( /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(resolve, reject) {
      var table;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            if (tableId) {
              _context7.next = 5;
              break;
            }
            resolve({
              status: 400,
              message: "Missing required parameter!",
              data: ""
            });
            _context7.next = 9;
            break;
          case 5:
            _context7.next = 7;
            return _index["default"].Table.findOne({
              where: {
                id: tableId
              }
            });
          case 7:
            table = _context7.sent;
            if (table) {
              resolve({
                status: 200,
                message: "OK",
                data: table
              });
            } else {
              resolve({
                status: 404,
                message: "Table is not exist",
                data: ""
              });
            }
          case 9:
            _context7.next = 14;
            break;
          case 11:
            _context7.prev = 11;
            _context7.t0 = _context7["catch"](0);
            reject(_context7.t0);
          case 14:
          case "end":
            return _context7.stop();
        }
      }, _callee7, null, [[0, 11]]);
    }));
    return function (_x13, _x14) {
      return _ref7.apply(this, arguments);
    };
  }());
};
var freeTable = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(_ref8, tableId) {
    var tableDAO, orderDAO, table, res;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          tableDAO = _ref8.tableDAO, orderDAO = _ref8.orderDAO;
          _context8.next = 3;
          return tableDAO.findTableById(tableId);
        case 3:
          table = _context8.sent;
          _context8.next = 6;
          return tableDAO.freeTable(orderDAO, table);
        case 6:
          res = _context8.sent;
          if (table) {
            _context8.next = 9;
            break;
          }
          throw {
            status: 404,
            message: "Restaurant table not found!"
          };
        case 9:
          _context8.next = 11;
          return tableDAO.freeTable(orderDAO, table);
        case 11:
          return _context8.abrupt("return", _context8.sent);
        case 12:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function freeTable(_x15, _x16) {
    return _ref9.apply(this, arguments);
  };
}();
var searchTable = function searchTable(data) {
  return new Promise( /*#__PURE__*/function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(resolve, reject) {
      var restaurants;
      return _regeneratorRuntime().wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            if (!(!data.people || !data.resDate || !data.resTime)) {
              _context9.next = 5;
              break;
            }
            resolve({
              status: 400,
              message: "Missing required parameter",
              data: ""
            });
            _context9.next = 16;
            break;
          case 5:
            restaurants = [];
            if (!(location === "ALL")) {
              _context9.next = 12;
              break;
            }
            _context9.next = 9;
            return _index["default"].Restaurant.findAll({});
          case 9:
            restaurants = _context9.sent;
            _context9.next = 15;
            break;
          case 12:
            _context9.next = 14;
            return _index["default"].Restaurant.findAll({
              where: {
                provinceId: location
              }
            });
          case 14:
            restaurants = _context9.sent;
          case 15:
            resolve({
              errCode: 0,
              message: "OK",
              data: restaurants
            });
          case 16:
            _context9.next = 21;
            break;
          case 18:
            _context9.prev = 18;
            _context9.t0 = _context9["catch"](0);
            reject(_context9.t0);
          case 21:
          case "end":
            return _context9.stop();
        }
      }, _callee9, null, [[0, 18]]);
    }));
    return function (_x17, _x18) {
      return _ref10.apply(this, arguments);
    };
  }());
};
function addHours(timeString, hours) {
  var _timeString$split = timeString.split(":"),
    _timeString$split2 = _slicedToArray(_timeString$split, 3),
    hoursStr = _timeString$split2[0],
    minutesStr = _timeString$split2[1],
    secondsStr = _timeString$split2[2];
  var hoursToAdd = parseInt(hoursStr) + hours;
  return "".concat(hoursToAdd, ":").concat(minutesStr, ":").concat(secondsStr);
}
function substractHours(timeString, hours) {
  var _timeString$split3 = timeString.split(":"),
    _timeString$split4 = _slicedToArray(_timeString$split3, 3),
    hoursStr = _timeString$split4[0],
    minutesStr = _timeString$split4[1],
    secondsStr = _timeString$split4[2];
  var hoursToAdd = parseInt(hoursStr) - hours;
  return "".concat(hoursToAdd, ":").concat(minutesStr, ":").concat(secondsStr);
}
function searchAvailableTables(_x19) {
  return _searchAvailableTables.apply(this, arguments);
}
function _searchAvailableTables() {
  _searchAvailableTables = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(data) {
    return _regeneratorRuntime().wrap(function _callee12$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          return _context13.abrupt("return", new Promise( /*#__PURE__*/function () {
            var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(resolve, reject) {
              var resTime, startTime, endTime, orders, bookedTables, _iterator2, _step2, item, table, allTables, availableTables, _loop, i;
              return _regeneratorRuntime().wrap(function _callee11$(_context12) {
                while (1) switch (_context12.prev = _context12.next) {
                  case 0:
                    _context12.prev = 0;
                    if (!data.resDate || !data.resTime || !data.people || !data.restaurantId) {
                      resolve({
                        status: 400,
                        message: "Missing required parameter",
                        data: ""
                      });
                    }
                    resTime = moment(data.resTime, "HH:mm:ss");
                    startTime = resTime.clone().subtract(2, "hours").format("HH:mm:ss");
                    endTime = resTime.clone().add(2, "hours").format("HH:mm:ss"); // Lấy danh sách các bàn đã được đặt trong khoảng thời gian yêu cầu
                    _context12.next = 7;
                    return _index["default"].Order.findAll({
                      where: _defineProperty({
                        resDate: data.resDate,
                        restaurantId: data.restaurantId,
                        resTime: _defineProperty({}, Op.between, [startTime, endTime])
                      }, Op.or, [{
                        resStatus: "seated"
                      }, {
                        resStatus: "pending"
                      },
                      // Thêm trạng thái pending
                      {
                        resStatus: "confirmed"
                      } // Thêm trạng thái confirmed
                      // Thêm các trạng thái khác nếu cần
                      ]),
                      raw: false,
                      nest: true // Include để lấy thông tin về bàn
                    });
                  case 7:
                    orders = _context12.sent;
                    bookedTables = [];
                    _iterator2 = _createForOfIteratorHelper(orders);
                    _context12.prev = 10;
                    _iterator2.s();
                  case 12:
                    if ((_step2 = _iterator2.n()).done) {
                      _context12.next = 20;
                      break;
                    }
                    item = _step2.value;
                    _context12.next = 16;
                    return _index["default"].OrderTable.findAll({
                      where: {
                        orderId: item.id
                      }
                    });
                  case 16:
                    table = _context12.sent;
                    table.map(function (t) {
                      return bookedTables.push(t.tableId);
                    });
                  case 18:
                    _context12.next = 12;
                    break;
                  case 20:
                    _context12.next = 25;
                    break;
                  case 22:
                    _context12.prev = 22;
                    _context12.t0 = _context12["catch"](10);
                    _iterator2.e(_context12.t0);
                  case 25:
                    _context12.prev = 25;
                    _iterator2.f();
                    return _context12.finish(25);
                  case 28:
                    _context12.next = 30;
                    return _index["default"].Table.findAll({
                      where: {
                        restaurantId: data.restaurantId
                      }
                    });
                  case 30:
                    allTables = _context12.sent;
                    availableTables = [];
                    _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop(i) {
                      return _regeneratorRuntime().wrap(function _loop$(_context11) {
                        while (1) switch (_context11.prev = _context11.next) {
                          case 0:
                            if (!(bookedTables.findIndex(function (e) {
                              return e === allTables[i].id;
                            }) !== -1)) {
                              _context11.next = 2;
                              break;
                            }
                            return _context11.abrupt("return", 1);
                          case 2:
                            availableTables.push(allTables[i]);
                          case 3:
                          case "end":
                            return _context11.stop();
                        }
                      }, _loop);
                    });
                    i = 0;
                  case 34:
                    if (!(i < allTables.length)) {
                      _context12.next = 41;
                      break;
                    }
                    return _context12.delegateYield(_loop(i), "t1", 36);
                  case 36:
                    if (!_context12.t1) {
                      _context12.next = 38;
                      break;
                    }
                    return _context12.abrupt("continue", 38);
                  case 38:
                    i++;
                    _context12.next = 34;
                    break;
                  case 41:
                    resolve({
                      status: 200,
                      message: "Search tables successfully!",
                      data: availableTables
                    });
                    _context12.next = 47;
                    break;
                  case 44:
                    _context12.prev = 44;
                    _context12.t2 = _context12["catch"](0);
                    reject(_context12.t2);
                  case 47:
                  case "end":
                    return _context12.stop();
                }
              }, _callee11, null, [[0, 44], [10, 22, 25, 28]]);
            }));
            return function (_x22, _x23) {
              return _ref12.apply(this, arguments);
            };
          }()));
        case 1:
        case "end":
          return _context13.stop();
      }
    }, _callee12);
  }));
  return _searchAvailableTables.apply(this, arguments);
}
var getAvailableTables = function getAvailableTables(data) {
  return new Promise( /*#__PURE__*/function () {
    var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(resolve, reject) {
      var tables, tmp, availableTables, _iterator, _step, table;
      return _regeneratorRuntime().wrap(function _callee10$(_context10) {
        while (1) switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            if (!data.restaurantId || !data.people) {
              resolve({
                status: 400,
                message: "Missing required parameter",
                data: ""
              });
            }
            _context10.next = 4;
            return _index["default"].Table.findAll({
              where: {
                restaurantId: data.restaurantId,
                orderId: 0
              },
              raw: true
            });
          case 4:
            tables = _context10.sent;
            if (!data.orderId) {
              _context10.next = 11;
              break;
            }
            _context10.next = 8;
            return _index["default"].Table.findAll({
              where: {
                restaurantId: data.restaurantId,
                orderId: data.orderId
              },
              raw: true
            });
          case 8:
            tmp = _context10.sent;
            tables = tables.concat(tmp);
            tables.sort(function (a, b) {
              return a.id - b.id;
            });
          case 11:
            availableTables = [];
            _iterator = _createForOfIteratorHelper(tables);
            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                table = _step.value;
                if (table.capacity == data.people) {
                  availableTables.push(table);
                }
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
            resolve({
              status: 200,
              message: "OK",
              data: availableTables
            });
            _context10.next = 20;
            break;
          case 17:
            _context10.prev = 17;
            _context10.t0 = _context10["catch"](0);
            reject(_context10.t0);
          case 20:
          case "end":
            return _context10.stop();
        }
      }, _callee10, null, [[0, 17]]);
    }));
    return function (_x20, _x21) {
      return _ref11.apply(this, arguments);
    };
  }());
};
module.exports = {
  getAllTables: getAllTables,
  createNewTable: createNewTable,
  deleteTable: deleteTable,
  updateTableData: updateTableData,
  getDetailTableById: getDetailTableById,
  freeTable: freeTable,
  searchTable: searchTable,
  searchAvailableTables: searchAvailableTables,
  getAllTablesByRestaurantId: getAllTablesByRestaurantId,
  getAvailableTables: getAvailableTables
};