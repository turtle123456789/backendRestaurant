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
var e = require("express");
var shortUUID = require("short-uuid");
var moment = require("moment");
var tmnCode = process.env.VNP_TMN_CODE;
var secretKey = process.env.VNP_HASH_SECRET;
var returnUrl = process.env.VNP_RETURN_URL;
var createPaymentWithVNP = function createPaymentWithVNP(req) {
  return new Promise( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(resolve, reject) {
      var _res, invoice, vnpUrl, date, createDate, ipAddr, orderId, amount, bankCode, locale, currCode, vnp_Params, querystring, signData, crypto, hmac, signed;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            process.env.TZ = "Asia/Ho_Chi_Minh";
            if (!(req.body.type === "deposit")) {
              _context.next = 11;
              break;
            }
            _context.next = 5;
            return createOrder(req.body.order);
          case 5:
            _res = _context.sent;
            if (!(_res.status !== 200)) {
              _context.next = 8;
              break;
            }
            return _context.abrupt("return", resolve(_res));
          case 8:
            req.body.orderId = _res.order.id;
            req.body.change = 0;
            req.body.amount = _res.order.depositAmount;
          case 11:
            _context.next = 13;
            return _index["default"].Invoice.create({
              id: shortUUID.generate(),
              orderId: req.body.orderId,
              received: req.body.received,
              type: req.body.type,
              change: req.body.change
            });
          case 13:
            invoice = _context.sent;
            vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
            date = new Date();
            createDate = moment(date).format("YYYYMMDDHHmmss");
            ipAddr = req.headers["x-forwarded-for"] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
            orderId = invoice.id;
            amount = req.body.amount;
            bankCode = req.body.bankCode;
            locale = req.body.language;
            if (locale === null || locale === "") {
              locale = "vn";
            }
            currCode = "VND";
            vnp_Params = {};
            vnp_Params["vnp_Version"] = "2.1.0";
            vnp_Params["vnp_Command"] = "pay";
            vnp_Params["vnp_TmnCode"] = tmnCode;
            vnp_Params["vnp_Locale"] = locale;
            vnp_Params["vnp_CurrCode"] = currCode;
            vnp_Params["vnp_TxnRef"] = orderId;
            vnp_Params["vnp_OrderInfo"] = "Thanh toan cho ma GD:" + orderId;
            vnp_Params["vnp_OrderType"] = "other";
            vnp_Params["vnp_Amount"] = amount * 100;
            vnp_Params["vnp_ReturnUrl"] = returnUrl;
            vnp_Params["vnp_IpAddr"] = ipAddr;
            vnp_Params["vnp_CreateDate"] = createDate;
            if (bankCode !== null && bankCode !== "") {
              vnp_Params["vnp_BankCode"] = bankCode;
            }
            vnp_Params = sortObject(vnp_Params);
            querystring = require("qs");
            signData = querystring.stringify(vnp_Params, {
              encode: false
            });
            crypto = require("crypto");
            hmac = crypto.createHmac("sha512", secretKey);
            signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
            vnp_Params["vnp_SecureHash"] = signed;
            vnpUrl += "?" + querystring.stringify(vnp_Params, {
              encode: false
            });
            resolve({
              status: 200,
              message: "success",
              data: vnpUrl
            });
            _context.next = 52;
            break;
          case 49:
            _context.prev = 49;
            _context.t0 = _context["catch"](0);
            reject(_context.t0);
          case 52:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 49]]);
    }));
    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};
var getReturn = function getReturn(req) {
  return new Promise( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(resolve, reject) {
      var vnp_Params, secureHash, querystring, signData, crypto, hmac, signed, invoice, _order;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            vnp_Params = req.query;
            secureHash = vnp_Params["vnp_SecureHash"];
            delete vnp_Params["vnp_SecureHash"];
            delete vnp_Params["vnp_SecureHashType"];
            vnp_Params = sortObject(vnp_Params);
            console.log("🚀 ~ returnnewPromise ~ vnp_Params:", vnp_Params);
            querystring = require("qs");
            signData = querystring.stringify(vnp_Params, {
              encode: false
            });
            crypto = require("crypto");
            hmac = crypto.createHmac("sha512", secretKey);
            signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
            if (!(secureHash === signed)) {
              _context2.next = 61;
              break;
            }
            _context2.next = 15;
            return _index["default"].Invoice.findOne({
              where: {
                id: vnp_Params["vnp_TxnRef"]
              },
              raw: false
            });
          case 15:
            invoice = _context2.sent;
            if (!invoice) {
              resolve({
                status: 404,
                message: "Order is not exist",
                data: ""
              });
            }
            console.log("🚀 ~ returnnewPromise ~ invoice:", invoice);
            _context2.next = 20;
            return _index["default"].Order.findOne({
              where: {
                id: invoice.orderId
              },
              raw: false
            });
          case 20:
            _order = _context2.sent;
            console.log("🚀 ~ returnnewPromise ~ order:", _order);
            if (invoice.type === "deposit" && invoice.received !== vnp_Params["vnp_Amount"] / 100) {
              resolve({
                status: 400,
                message: "Amount is not match",
                data: ""
              });
            }
            if (invoice.type === "checkout" && _order.totalAmount - _order.depositAmount !== vnp_Params["vnp_Amount"] / 100) {
              resolve({
                status: 400,
                message: "Amount is not match",
                data: ""
              });
            }
            if (!(vnp_Params["vnp_ResponseCode"] == "00")) {
              _context2.next = 50;
              break;
            }
            if (!(invoice.type === "deposit")) {
              _context2.next = 31;
              break;
            }
            _order.paymentStatus = "deposited";
            _order.resStatus = "confirmed";
            _context2.next = 30;
            return _order.save();
          case 30:
            console.log("update order status");
          case 31:
            if (!(invoice.type === "checkout")) {
              _context2.next = 36;
              break;
            }
            _order.paymentStatus = "paid";
            _order.resStatus = "done";
            _context2.next = 36;
            return _order.save();
          case 36:
            if (!(invoice.type === "refund")) {
              _context2.next = 41;
              break;
            }
            _order.paymentStatus = "refunded";
            _order.resStatus = "cancel";
            _context2.next = 41;
            return _order.save();
          case 41:
            invoice.status = "success";
            _context2.next = 44;
            return _mailService["default"].notifyOrderPlaceSuccess(_order);
          case 44:
            console.log("update invoice status");
            _context2.next = 47;
            return invoice.save();
          case 47:
            resolve({
              status: 200,
              message: "success",
              orderId: _order.id
            });
            _context2.next = 59;
            break;
          case 50:
            if (!(invoice.type === "deposit")) {
              _context2.next = 55;
              break;
            }
            _context2.next = 53;
            return _index["default"].Order.destroy({
              where: {
                id: invoice.orderId
              }
            });
          case 53:
            _context2.next = 55;
            return _index["default"].OrderItem.destroyAll({
              where: {
                orderId: invoice.orderId
              }
            });
          case 55:
            invoice.status = "failed";
            _context2.next = 58;
            return invoice.save();
          case 58:
            resolve({
              status: 400,
              message: "Payment failed"
            });
          case 59:
            _context2.next = 62;
            break;
          case 61:
            reject("Invalid signature");
          case 62:
            _context2.next = 67;
            break;
          case 64:
            _context2.prev = 64;
            _context2.t0 = _context2["catch"](0);
            reject(_context2.t0);
          case 67:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 64]]);
    }));
    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());
};
var vnpayIPN = function vnpayIPN(req) {
  return new Promise( /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(resolve, reject) {
      var vnp_Params, secureHash, config, _tmnCode, _secretKey, querystring, signData, crypto, hmac, signed;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            try {
              vnp_Params = req.query;
              secureHash = vnp_Params["vnp_SecureHash"];
              delete vnp_Params["vnp_SecureHash"];
              delete vnp_Params["vnp_SecureHashType"];
              vnp_Params = sortObject(vnp_Params);
              config = require("config");
              _tmnCode = config.get("vnp_TmnCode");
              _secretKey = config.get("vnp_HashSecret");
              querystring = require("qs");
              signData = querystring.stringify(vnp_Params, {
                encode: false
              });
              crypto = require("crypto");
              hmac = crypto.createHmac("sha512", _secretKey);
              signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
              if (secureHash === signed) {
                res.render("success", {
                  code: vnp_Params["vnp_ResponseCode"]
                });
              } else {
                res.render("success", {
                  code: "97"
                });
              }
            } catch (e) {
              reject(e);
            }
          case 1:
          case "end":
            return _context3.stop();
        }
      }, _callee3);
    }));
    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());
};
function createOrder(_x7) {
  return _createOrder.apply(this, arguments);
}
function _createOrder() {
  _createOrder = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(data) {
    var _data$order$cusId, _order2, totalDepositAmount, _iterator, _step, item, dish, price, depositAmount;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          if (!(!data.order.resTime || !data.order.resDate || !data.order.people || !data.order.restaurantId || !data.order.fullName || !data.order.phoneNumber || !data.order.email || data.order.resTime === "" || data.order.resDate === "" || data.order.people === "" || data.order.restaurantId === "" || data.order.fullName === "" || data.order.phoneNumber === "" || data.order.email === "")) {
            _context4.next = 3;
            break;
          }
          return _context4.abrupt("return", {
            status: 400,
            message: "Missing required parameter!"
          });
        case 3:
          _context4.next = 5;
          return _index["default"].Order.create({
            resStatus: "pending",
            fullName: data.order.fullName,
            phoneNumber: data.order.phoneNumber,
            resDate: data.order.resDate,
            resTime: data.order.resTime,
            people: data.order.people,
            depositAmount: 0,
            restaurantId: data.order.restaurantId,
            email: data.order.email,
            cusId: (_data$order$cusId = data.order.cusId) !== null && _data$order$cusId !== void 0 ? _data$order$cusId : null
          });
        case 5:
          _order2 = _context4.sent;
          totalDepositAmount = 0;
          _iterator = _createForOfIteratorHelper(data.orderItems);
          _context4.prev = 8;
          _iterator.s();
        case 10:
          if ((_step = _iterator.n()).done) {
            _context4.next = 22;
            break;
          }
          item = _step.value;
          _context4.next = 14;
          return _index["default"].Dish.findOne({
            where: {
              id: item.dishId
            },
            raw: false
          });
        case 14:
          dish = _context4.sent;
          price = dish.price * item.quantity;
          depositAmount = price * 0.3;
          totalDepositAmount += depositAmount;
          _context4.next = 20;
          return _index["default"].OrderItem.create({
            orderId: _order2.id,
            dishId: item.dishId,
            quantity: item.quantity,
            price: price,
            status: "waiting",
            note: item.note
          });
        case 20:
          _context4.next = 10;
          break;
        case 22:
          _context4.next = 27;
          break;
        case 24:
          _context4.prev = 24;
          _context4.t0 = _context4["catch"](8);
          _iterator.e(_context4.t0);
        case 27:
          _context4.prev = 27;
          _iterator.f();
          return _context4.finish(27);
        case 30:
          _order2.depositAmount = totalDepositAmount;
          _order2.totalAmount = totalDepositAmount / 0.3;
          _context4.next = 34;
          return _order2.save();
        case 34:
          return _context4.abrupt("return", {
            status: 200,
            message: "success",
            order: _order2
          });
        case 37:
          _context4.prev = 37;
          _context4.t1 = _context4["catch"](0);
          if (!order) {
            _context4.next = 42;
            break;
          }
          _context4.next = 42;
          return _index["default"].Order.destroy({
            where: {
              id: order.id
            }
          });
        case 42:
          return _context4.abrupt("return", {
            status: 500,
            message: "Error from server..."
          });
        case 43:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 37], [8, 24, 27, 30]]);
  }));
  return _createOrder.apply(this, arguments);
}
function sortObject(obj) {
  var sorted = {};
  var str = [];
  var key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}
module.exports = {
  createPaymentWithVNP: createPaymentWithVNP,
  getReturn: getReturn
};