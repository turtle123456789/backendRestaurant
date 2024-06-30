"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _index = _interopRequireDefault(require("../models/index"));
var _mailService = _interopRequireDefault(require("./mailService"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var table = require("../models/table");
var dateTimeValidator = require("../utils/dateAndTimeValidator");
var invoiceService = require("../services/invoiceService");
var getAllOrders = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(orderDAO) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return orderDAO.findAllOrders();
        case 2:
          return _context.abrupt("return", _context.sent);
        case 3:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function getAllOrders(_x) {
    return _ref.apply(this, arguments);
  };
}();
var validateTime = function validateTime(currDate, resDate, resTime) {
  if (resDate === dateTimeValidator.asDateString(currDate)) {
    if (resTime < dateTimeValidator.asTimeString(currDate)) {
      throw {
        status: 400,
        message: "ERROR: Given time is in the past!"
      };
    }
  }
};
var checkClosingOpeningTime = function checkClosingOpeningTime(resTime) {
  if (resTime > "23:00:59") {
    throw {
      status: 400,
      message: "Order must be made at least an hour before closing time (12:00 AM)"
    };
  } else if (resTime < "11:00:59") {
    throw {
      status: 400,
      message: "You can't make order before opening time! (11:00 AM)"
    };
  }
};
var isFieldEmpty = function isFieldEmpty(payload) {
  if (!payload.fullName || !payload.phone || !payload.email || !payload.resDate || !payload.resTime || !payload.people) {
    throw {
      status: 400,
      message: "Please fill in all fields!"
    };
  }
};
var registerOrder = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(orderDAO, payload) {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          isFieldEmpty(payload);
          validateTime(new Date(), payload.resDate, payload.resTime);
          checkClosingOpeningTime(payload.resTime);
          _context2.next = 5;
          return orderDAO.createOrder(payload);
        case 5:
          return _context2.abrupt("return", _context2.sent);
        case 6:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function registerOrder(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();
var editOrder = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(orderId, orderDAO, payload) {
    var order;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return orderDAO.findOrderById(orderId);
        case 2:
          order = _context3.sent;
          if (order) {
            _context3.next = 5;
            break;
          }
          throw {
            status: 404,
            message: "Order not found!"
          };
        case 5:
          validateTime(new Date(), payload.resDate, payload.resTime);
          checkClosingOpeningTime(payload.resTime);
          _context3.next = 9;
          return orderDAO.updateOrder(orderId, payload);
        case 9:
          return _context3.abrupt("return", _context3.sent);
        case 10:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function editOrder(_x4, _x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var cancelOrder = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(orderId, orderDAO) {
    var order;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return orderDAO.findOrderById(orderId);
        case 2:
          order = _context4.sent;
          if (!order) {
            _context4.next = 7;
            break;
          }
          _context4.next = 6;
          return orderDAO.deleteOrder(order);
        case 6:
          return _context4.abrupt("return", _context4.sent);
        case 7:
          throw {
            status: 400,
            message: "Given order doesn't exist!"
          };
        case 8:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function cancelOrder(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var compareResDateToCurrDate = function compareResDateToCurrDate(resDate, currDate) {
  return resDate > currDate ? 1 : resDate < currDate ? -1 : 0;
};
var chooseTable = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(orderId, tableId, orderDAO, tableDAO) {
    var order, table, currDate, currDateStr, _order, currTimePlus30minsStr;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return orderDAO.findOrderById(orderId);
        case 2:
          order = _context5.sent;
          if (order) {
            _context5.next = 5;
            break;
          }
          throw {
            status: 404,
            message: "Order not found!"
          };
        case 5:
          _context5.next = 7;
          return tableDAO.findTableById(tableId);
        case 7:
          table = _context5.sent;
          currDate = new Date();
          currDateStr = dateTimeValidator.asDateString(currDate);
          /**
           * if the order day is in the future (compared to current date)
           *  => throw error
           */
          if (!(compareResDateToCurrDate(order.resDate, currDateStr) === 1)) {
            _context5.next = 12;
            break;
          }
          throw {
            status: 400,
            message: "Booking a table is only available on the order date!"
          };
        case 12:
          if (!(compareResDateToCurrDate(order.resDate, currDateStr) === -1)) {
            _context5.next = 15;
            break;
          }
          _context5.next = 15;
          return orderDAO.setOrderStatus(order, "missed");
        case 15:
          if (!(compareResDateToCurrDate(order.resDate, currDateStr) === 0)) {
            _context5.next = 21;
            break;
          }
          currTimePlus30minsStr = dateTimeValidator.asTimeString(new Date(currDate.setMinutes(currDate.getMinutes() - 2)));
          if (!(currTimePlus30minsStr > ((_order = order) === null || _order === void 0 ? void 0 : _order.resTime))) {
            _context5.next = 21;
            break;
          }
          _context5.next = 20;
          return orderDAO.setOrderStatus(order, "missed");
        case 20:
          order = _context5.sent;
        case 21:
          if (!(order.resStatus === "seated")) {
            _context5.next = 25;
            break;
          }
          throw {
            status: 400,
            message: "You've already reserved a table! Please make a new order."
          };
        case 25:
          if (!(order.resStatus === "missed")) {
            _context5.next = 27;
            break;
          }
          throw {
            status: 400,
            message: "You've missed the order date and time! Please make a new order."
          };
        case 27:
          if (!table.isOccupied) {
            _context5.next = 29;
            break;
          }
          throw {
            status: 400,
            message: "Given table is already reserved!"
          };
        case 29:
          if (!(order.people > table.capacity)) {
            _context5.next = 31;
            break;
          }
          throw {
            status: 400,
            message: "Order's party size is too big for this table!"
          };
        case 31:
          _context5.next = 33;
          return orderDAO.setOrderTable(orderId, tableId);
        case 33:
          return _context5.abrupt("return", _context5.sent);
        case 34:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function chooseTable(_x9, _x10, _x11, _x12) {
    return _ref5.apply(this, arguments);
  };
}();
var getAllOrdersByRestaurantId = function getAllOrdersByRestaurantId(data) {
  return new Promise( /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(resolve, reject) {
      var orders;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            if (data.restaurantId) {
              _context6.next = 5;
              break;
            }
            resolve({
              status: 400,
              message: "Missing required parameter!",
              data: ""
            });
            _context6.next = 9;
            break;
          case 5:
            _context6.next = 7;
            return _index["default"].Order.findAll({
              where: {
                restaurantId: data.restaurantId
              }
            });
          case 7:
            orders = _context6.sent;
            resolve({
              status: 200,
              message: "OK",
              data: orders
            });
          case 9:
            _context6.next = 14;
            break;
          case 11:
            _context6.prev = 11;
            _context6.t0 = _context6["catch"](0);
            reject(_context6.t0);
          case 14:
          case "end":
            return _context6.stop();
        }
      }, _callee6, null, [[0, 11]]);
    }));
    return function (_x13, _x14) {
      return _ref6.apply(this, arguments);
    };
  }());
};
var updateStatusOrder = function updateStatusOrder(data) {
  return new Promise( /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(resolve, reject) {
      var order, bookedTables, i, _table;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            if (!data.orderId || !data.status) {
              resolve({
                status: 400,
                message: "Missing required parameter",
                data: ""
              });
            }
            _context7.next = 4;
            return _index["default"].Order.findOne({
              where: {
                id: data.orderId
              },
              raw: false
            });
          case 4:
            order = _context7.sent;
            if (!order) {
              resolve({
                status: 404,
                message: "Order is not exist",
                data: ""
              });
            }
            order.resStatus = data.status;
            _context7.next = 9;
            return order.save();
          case 9:
            _context7.next = 11;
            return _index["default"].OrderTable.findAll({
              where: {
                orderId: data.orderId
              },
              raw: false
            });
          case 11:
            bookedTables = _context7.sent;
            i = 0;
          case 13:
            if (!(i < bookedTables.length)) {
              _context7.next = 23;
              break;
            }
            _context7.next = 16;
            return _index["default"].Table.findOne({
              where: {
                id: bookedTables[i].tableId
              },
              raw: false
            });
          case 16:
            _table = _context7.sent;
            if (data.status === "seated") {
              _table.isOccupied = 1;
            } else {
              _table.isOccupied = 0;
            }
            _context7.next = 20;
            return _table.save();
          case 20:
            i++;
            _context7.next = 13;
            break;
          case 23:
            resolve({
              status: 200,
              message: "Update order status success!",
              data: order
            });
            _context7.next = 29;
            break;
          case 26:
            _context7.prev = 26;
            _context7.t0 = _context7["catch"](0);
            reject(_context7.t0);
          case 29:
          case "end":
            return _context7.stop();
        }
      }, _callee7, null, [[0, 26]]);
    }));
    return function (_x15, _x16) {
      return _ref7.apply(this, arguments);
    };
  }());
};
var createOrderByStaff = function createOrderByStaff(data) {
  return new Promise( /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(resolve, reject) {
      var order, totalDepositAmount, _iterator, _step, item, dish, price, depositAmount, _iterator2, _step2, _table2;
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            if (!(!data.resTime || !data.resDate || !data.people || !data.restaurantId || !data.tables)) {
              _context8.next = 3;
              break;
            }
            return _context8.abrupt("return", resolve({
              status: 400,
              message: "Missing required parameter",
              data: ""
            }));
          case 3:
            _context8.next = 5;
            return _index["default"].Order.create({
              resStatus: "pending",
              fullName: data.fullName,
              phoneNumber: data.phoneNumber,
              resDate: data.resDate,
              resTime: data.resTime,
              people: data.people,
              depositAmount: 0,
              restaurantId: data.restaurantId
            });
          case 5:
            order = _context8.sent;
            totalDepositAmount = 0;
            _iterator = _createForOfIteratorHelper(data.orderItemArray);
            _context8.prev = 8;
            _iterator.s();
          case 10:
            if ((_step = _iterator.n()).done) {
              _context8.next = 22;
              break;
            }
            item = _step.value;
            _context8.next = 14;
            return _index["default"].Dish.findOne({
              where: {
                id: item.dishId
              },
              raw: false
            });
          case 14:
            dish = _context8.sent;
            price = dish.price * item.quantity;
            depositAmount = price * 0.3;
            totalDepositAmount += depositAmount;
            _context8.next = 20;
            return _index["default"].OrderItem.create({
              orderId: order.id,
              dishId: item.dishId,
              quantity: item.quantity,
              price: price,
              status: "waiting",
              note: item.note
            });
          case 20:
            _context8.next = 10;
            break;
          case 22:
            _context8.next = 27;
            break;
          case 24:
            _context8.prev = 24;
            _context8.t0 = _context8["catch"](8);
            _iterator.e(_context8.t0);
          case 27:
            _context8.prev = 27;
            _iterator.f();
            return _context8.finish(27);
          case 30:
            order.depositAmount = 0;
            order.totalAmount = totalDepositAmount / 0.3;
            order.resStatus = "seated";
            _context8.next = 35;
            return order.save();
          case 35:
            _iterator2 = _createForOfIteratorHelper(data.tables);
            _context8.prev = 36;
            _iterator2.s();
          case 38:
            if ((_step2 = _iterator2.n()).done) {
              _context8.next = 44;
              break;
            }
            _table2 = _step2.value;
            _context8.next = 42;
            return _index["default"].Table.update({
              orderId: order.id
            }, {
              where: {
                id: _table2
              }
            });
          case 42:
            _context8.next = 38;
            break;
          case 44:
            _context8.next = 49;
            break;
          case 46:
            _context8.prev = 46;
            _context8.t1 = _context8["catch"](36);
            _iterator2.e(_context8.t1);
          case 49:
            _context8.prev = 49;
            _iterator2.f();
            return _context8.finish(49);
          case 52:
            return _context8.abrupt("return", resolve({
              status: 201,
              message: "Create order successfully",
              data: order
            }));
          case 55:
            _context8.prev = 55;
            _context8.t2 = _context8["catch"](0);
            reject(_context8.t2);
          case 58:
          case "end":
            return _context8.stop();
        }
      }, _callee8, null, [[0, 55], [8, 24, 27, 30], [36, 46, 49, 52]]);
    }));
    return function (_x17, _x18) {
      return _ref8.apply(this, arguments);
    };
  }());
};
var updateOrder = function updateOrder(data) {
  return new Promise( /*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(resolve, reject) {
      var order, key;
      return _regeneratorRuntime().wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            if (data.orderId) {
              _context9.next = 4;
              break;
            }
            resolve({
              status: 400,
              message: "Missing required parameter",
              data: ""
            });
            return _context9.abrupt("return");
          case 4:
            _context9.next = 6;
            return _index["default"].Order.findOne({
              where: {
                id: data.orderId
              },
              raw: false
            });
          case 6:
            order = _context9.sent;
            if (order) {
              _context9.next = 10;
              break;
            }
            resolve({
              status: 404,
              message: "Order is not exist",
              data: ""
            });
            return _context9.abrupt("return");
          case 10:
            _context9.t0 = _regeneratorRuntime().keys(data);
          case 11:
            if ((_context9.t1 = _context9.t0()).done) {
              _context9.next = 18;
              break;
            }
            key = _context9.t1.value;
            if (key !== "orderId") order[key] = data[key];
            _context9.next = 16;
            return order.save();
          case 16:
            _context9.next = 11;
            break;
          case 18:
            resolve({
              status: 200,
              message: "Update order status success!",
              data: order
            });
            _context9.next = 24;
            break;
          case 21:
            _context9.prev = 21;
            _context9.t2 = _context9["catch"](0);
            reject(_context9.t2);
          case 24:
          case "end":
            return _context9.stop();
        }
      }, _callee9, null, [[0, 21]]);
    }));
    return function (_x19, _x20) {
      return _ref9.apply(this, arguments);
    };
  }());
};
var getAllOrdersByCustomerPhoneNumber = function getAllOrdersByCustomerPhoneNumber(data) {
  return new Promise( /*#__PURE__*/function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(resolve, reject) {
      var orders;
      return _regeneratorRuntime().wrap(function _callee10$(_context10) {
        while (1) switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            if (!data.customerPhoneNumber) {
              resolve({
                status: 400,
                message: "Missing required parameter",
                data: ""
              });
            }
            _context10.next = 4;
            return _index["default"].Order.findAll({
              where: {
                phoneNumber: data.customerPhoneNumber
              }
            });
          case 4:
            orders = _context10.sent;
            resolve({
              status: 200,
              message: "OK",
              data: orders
            });
            _context10.next = 11;
            break;
          case 8:
            _context10.prev = 8;
            _context10.t0 = _context10["catch"](0);
            reject(_context10.t0);
          case 11:
          case "end":
            return _context10.stop();
        }
      }, _callee10, null, [[0, 8]]);
    }));
    return function (_x21, _x22) {
      return _ref10.apply(this, arguments);
    };
  }());
};
var getAllOrdersByCustomerId = function getAllOrdersByCustomerId(data) {
  return new Promise( /*#__PURE__*/function () {
    var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(resolve, reject) {
      var orders;
      return _regeneratorRuntime().wrap(function _callee11$(_context11) {
        while (1) switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            if (!data.id) {
              resolve({
                status: 400,
                message: "Missing required parameter",
                data: ""
              });
            }
            _context11.next = 4;
            return _index["default"].Order.findAll({
              where: {
                cusId: data.id
              }
            });
          case 4:
            orders = _context11.sent;
            resolve({
              status: 200,
              message: "OK",
              data: orders
            });
            _context11.next = 11;
            break;
          case 8:
            _context11.prev = 8;
            _context11.t0 = _context11["catch"](0);
            reject(_context11.t0);
          case 11:
          case "end":
            return _context11.stop();
        }
      }, _callee11, null, [[0, 8]]);
    }));
    return function (_x23, _x24) {
      return _ref11.apply(this, arguments);
    };
  }());
};
var getDetailOrderByOrderId = function getDetailOrderByOrderId(data) {
  return new Promise( /*#__PURE__*/function () {
    var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(resolve, reject) {
      var order, dishes, tables, orderItems, i, dish;
      return _regeneratorRuntime().wrap(function _callee12$(_context12) {
        while (1) switch (_context12.prev = _context12.next) {
          case 0:
            _context12.prev = 0;
            if (data.orderId) {
              _context12.next = 3;
              break;
            }
            return _context12.abrupt("return", resolve({
              status: 400,
              message: "Missing required parameter!",
              data: ""
            }));
          case 3:
            _context12.next = 5;
            return _index["default"].Order.findOne({
              where: {
                id: data.orderId
              }
            });
          case 5:
            order = _context12.sent;
            if (order) {
              _context12.next = 8;
              break;
            }
            return _context12.abrupt("return", resolve({
              status: 404,
              message: "Order is not exist",
              data: ""
            }));
          case 8:
            dishes = []; // let bookedTables = await db.OrderTable.findAll({
            //   where: { orderId: data.orderId },
            // });
            // if (bookedTables.length > 0) {
            //   for (let i = 0; i < bookedTables.length; i++) {
            //     let table = await db.Table.findOne({
            //       where: { id: bookedTables[i].tableId },
            //     });
            //     tables.push(table);
            //   }
            // }
            _context12.next = 11;
            return _index["default"].Table.findAll({
              where: {
                orderId: order.id
              },
              attributes: ["id", "name", "capacity", "position", "description"]
            });
          case 11:
            tables = _context12.sent;
            _context12.next = 14;
            return _index["default"].OrderItem.findAll({
              where: {
                orderId: data.orderId
              }
            });
          case 14:
            orderItems = _context12.sent;
            if (!(orderItems.length > 0)) {
              _context12.next = 25;
              break;
            }
            i = 0;
          case 17:
            if (!(i < orderItems.length)) {
              _context12.next = 25;
              break;
            }
            _context12.next = 20;
            return _index["default"].Dish.findOne({
              where: {
                id: orderItems[i].dishId
              }
            });
          case 20:
            dish = _context12.sent;
            dishes.push({
              id: orderItems[i].id,
              dishId: dish.id,
              dishName: dish.name,
              price: orderItems[i].price,
              quantity: orderItems[i].quantity
            });
          case 22:
            i++;
            _context12.next = 17;
            break;
          case 25:
            return _context12.abrupt("return", resolve({
              status: 200,
              message: "Get detail order successfully",
              data: [{
                order: order,
                tables: tables,
                orderItems: dishes
                // user: user,
              }]
            }));
          case 28:
            _context12.prev = 28;
            _context12.t0 = _context12["catch"](0);
            reject(_context12.t0);
          case 31:
          case "end":
            return _context12.stop();
        }
      }, _callee12, null, [[0, 28]]);
    }));
    return function (_x25, _x26) {
      return _ref12.apply(this, arguments);
    };
  }());
};
var updateOrderItem = function updateOrderItem(data) {
  return new Promise( /*#__PURE__*/function () {
    var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(resolve, reject) {
      var order, _iterator3, _step3, item, orderItem, key, dishes, orderItems, i, dish;
      return _regeneratorRuntime().wrap(function _callee13$(_context13) {
        while (1) switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
            if (!data.items || !data.orderId) {
              resolve({
                status: 400,
                message: "Missing required parameter",
                data: ""
              });
            }
            _context13.next = 4;
            return _index["default"].Order.findOne({
              where: {
                id: data.orderId
              }
            });
          case 4:
            order = _context13.sent;
            if (!order) {
              resolve({
                status: 404,
                message: "Order is not exist",
                data: ""
              });
            }
            _iterator3 = _createForOfIteratorHelper(data.items);
            _context13.prev = 7;
            _iterator3.s();
          case 9:
            if ((_step3 = _iterator3.n()).done) {
              _context13.next = 30;
              break;
            }
            item = _step3.value;
            if (!(item.action === "add")) {
              _context13.next = 15;
              break;
            }
            _context13.next = 14;
            return _index["default"].OrderItem.create({
              orderId: data.orderId,
              dishId: item.dishId,
              quantity: item.quantity,
              price: item.price
            });
          case 14:
            return _context13.abrupt("continue", 28);
          case 15:
            if (!(item.action === "delete")) {
              _context13.next = 19;
              break;
            }
            _context13.next = 18;
            return _index["default"].OrderItem.destroy({
              where: {
                id: item.id
              }
            });
          case 18:
            return _context13.abrupt("continue", 28);
          case 19:
            _context13.next = 21;
            return _index["default"].OrderItem.findOne({
              where: {
                id: item.id
              },
              raw: false
            });
          case 21:
            orderItem = _context13.sent;
            if (orderItem) {
              _context13.next = 25;
              break;
            }
            resolve({
              status: 404,
              message: "Order item is not exist",
              data: ""
            });
            return _context13.abrupt("return");
          case 25:
            for (key in item) {
              if (key !== "id") orderItem[key] = item[key];
            }
            _context13.next = 28;
            return orderItem.save();
          case 28:
            _context13.next = 9;
            break;
          case 30:
            _context13.next = 35;
            break;
          case 32:
            _context13.prev = 32;
            _context13.t0 = _context13["catch"](7);
            _iterator3.e(_context13.t0);
          case 35:
            _context13.prev = 35;
            _iterator3.f();
            return _context13.finish(35);
          case 38:
            dishes = [];
            _context13.next = 41;
            return _index["default"].OrderItem.findAll({
              where: {
                orderId: data.orderId
              }
            });
          case 41:
            orderItems = _context13.sent;
            if (!(orderItems.length > 0)) {
              _context13.next = 52;
              break;
            }
            i = 0;
          case 44:
            if (!(i < orderItems.length)) {
              _context13.next = 52;
              break;
            }
            _context13.next = 47;
            return _index["default"].Dish.findOne({
              where: {
                id: orderItems[i].dishId
              }
            });
          case 47:
            dish = _context13.sent;
            dishes.push({
              id: orderItems[i].id,
              dishId: dish.id,
              dishName: dish.name,
              price: orderItems[i].price,
              quantity: orderItems[i].quantity
            });
          case 49:
            i++;
            _context13.next = 44;
            break;
          case 52:
            resolve({
              status: 200,
              message: "Update order item successfully",
              data: dishes
            });
            _context13.next = 58;
            break;
          case 55:
            _context13.prev = 55;
            _context13.t1 = _context13["catch"](0);
            reject(_context13.t1);
          case 58:
          case "end":
            return _context13.stop();
        }
      }, _callee13, null, [[0, 55], [7, 32, 35, 38]]);
    }));
    return function (_x27, _x28) {
      return _ref13.apply(this, arguments);
    };
  }());
};
var newUpdateOrder = function newUpdateOrder(data) {
  return new Promise( /*#__PURE__*/function () {
    var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(resolve, reject) {
      var order, preStatus, totalAmount, _iterator4, _step4, item, _iterator5, _step5, _table3;
      return _regeneratorRuntime().wrap(function _callee14$(_context14) {
        while (1) switch (_context14.prev = _context14.next) {
          case 0:
            console.log("🚀 ~ newUpdateOrder ~ data:", data);
            _context14.prev = 1;
            if (data.orderId) {
              _context14.next = 5;
              break;
            }
            resolve({
              status: 400,
              message: "Missing required parameter",
              data: ""
            });
            return _context14.abrupt("return");
          case 5:
            _context14.next = 7;
            return _index["default"].Order.findOne({
              where: {
                id: data.orderId
              },
              raw: false
            });
          case 7:
            order = _context14.sent;
            if (order) {
              _context14.next = 11;
              break;
            }
            resolve({
              status: 404,
              message: "Order is not exist",
              data: ""
            });
            return _context14.abrupt("return");
          case 11:
            if (!data.orderStatus) {
              _context14.next = 22;
              break;
            }
            preStatus = order.resStatus;
            order.resStatus = data.orderStatus;
            _context14.next = 16;
            return order.save();
          case 16:
            if (!(preStatus === "pending" && data.orderStatus === "confirmed")) {
              _context14.next = 19;
              break;
            }
            _context14.next = 19;
            return _mailService["default"].notifyOrderPlaceSuccess(order);
          case 19:
            if (!(data.orderStatus === "canceled")) {
              _context14.next = 22;
              break;
            }
            _context14.next = 22;
            return _mailService["default"].notifyOrderCanceled(order);
          case 22:
            if (!data.newOrderItems) {
              _context14.next = 47;
              break;
            }
            totalAmount = 0;
            _context14.next = 26;
            return _index["default"].OrderItem.destroy({
              where: {
                orderId: data.orderId
              }
            });
          case 26:
            _iterator4 = _createForOfIteratorHelper(data.newOrderItems);
            _context14.prev = 27;
            _iterator4.s();
          case 29:
            if ((_step4 = _iterator4.n()).done) {
              _context14.next = 36;
              break;
            }
            item = _step4.value;
            totalAmount += item.total;
            _context14.next = 34;
            return _index["default"].OrderItem.create({
              orderId: data.orderId,
              dishId: item.dishId,
              quantity: item.quantity,
              price: item.total
            });
          case 34:
            _context14.next = 29;
            break;
          case 36:
            _context14.next = 41;
            break;
          case 38:
            _context14.prev = 38;
            _context14.t0 = _context14["catch"](27);
            _iterator4.e(_context14.t0);
          case 41:
            _context14.prev = 41;
            _iterator4.f();
            return _context14.finish(41);
          case 44:
            order.totalAmount = totalAmount;
            _context14.next = 47;
            return order.save();
          case 47:
            if (!data.newTables) {
              _context14.next = 67;
              break;
            }
            _context14.next = 50;
            return _index["default"].Table.update({
              orderId: 0
            }, {
              where: {
                orderId: order.id
              }
            });
          case 50:
            _iterator5 = _createForOfIteratorHelper(data.newTables);
            _context14.prev = 51;
            _iterator5.s();
          case 53:
            if ((_step5 = _iterator5.n()).done) {
              _context14.next = 59;
              break;
            }
            _table3 = _step5.value;
            _context14.next = 57;
            return _index["default"].Table.update({
              orderId: order.id
            }, {
              where: {
                id: _table3.id
              }
            });
          case 57:
            _context14.next = 53;
            break;
          case 59:
            _context14.next = 64;
            break;
          case 61:
            _context14.prev = 61;
            _context14.t1 = _context14["catch"](51);
            _iterator5.e(_context14.t1);
          case 64:
            _context14.prev = 64;
            _iterator5.f();
            return _context14.finish(64);
          case 67:
            resolve({
              status: 200,
              message: "Update order status success!",
              data: order
            });
            _context14.next = 73;
            break;
          case 70:
            _context14.prev = 70;
            _context14.t2 = _context14["catch"](1);
            reject(_context14.t2);
          case 73:
          case "end":
            return _context14.stop();
        }
      }, _callee14, null, [[1, 70], [27, 38, 41, 44], [51, 61, 64, 67]]);
    }));
    return function (_x29, _x30) {
      return _ref14.apply(this, arguments);
    };
  }());
};
var checkoutOrder = function checkoutOrder(data) {
  return new Promise( /*#__PURE__*/function () {
    var _ref15 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(resolve, reject) {
      var order, subAmount, change;
      return _regeneratorRuntime().wrap(function _callee15$(_context15) {
        while (1) switch (_context15.prev = _context15.next) {
          case 0:
            _context15.prev = 0;
            if (!data.orderId || !data.receivedMoney || data.orderId === "" || data.receivedMoney === "") resolve({
              status: 400,
              message: "Missing required parameter"
            });
            _context15.next = 4;
            return _index["default"].Order.findOne({
              where: {
                id: data.orderId
              },
              raw: false
            });
          case 4:
            order = _context15.sent;
            if (order) {
              _context15.next = 8;
              break;
            }
            resolve({
              status: 404,
              message: "Order is not exist",
              data: ""
            });
            return _context15.abrupt("return");
          case 8:
            subAmount = order.totalAmount - order.depositAmount;
            change = data.receivedMoney - subAmount;
            return _context15.abrupt("return", resolve({
              status: 200,
              message: "Checkout successful",
              data: {
                subAmount: subAmount,
                change: change
              }
            }));
          case 13:
            _context15.prev = 13;
            _context15.t0 = _context15["catch"](0);
            reject(_context15.t0);
          case 16:
          case "end":
            return _context15.stop();
        }
      }, _callee15, null, [[0, 13]]);
    }));
    return function (_x31, _x32) {
      return _ref15.apply(this, arguments);
    };
  }());
};
module.exports = {
  getAllOrders: getAllOrders,
  registerOrder: registerOrder,
  editOrder: editOrder,
  cancelOrder: cancelOrder,
  chooseTable: chooseTable,
  getAllOrdersByRestaurantId: getAllOrdersByRestaurantId,
  updateStatusOrder: updateStatusOrder,
  getAllOrdersByCustomerPhoneNumber: getAllOrdersByCustomerPhoneNumber,
  getDetailOrderByOrderId: getDetailOrderByOrderId,
  updateOrder: updateOrder,
  updateOrderItem: updateOrderItem,
  newUpdateOrder: newUpdateOrder,
  createOrderByStaff: createOrderByStaff,
  getAllOrdersByCustomerId: getAllOrdersByCustomerId,
  checkoutOrder: checkoutOrder
};