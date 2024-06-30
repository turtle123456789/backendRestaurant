"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _lodash = require("lodash");
var _index = _interopRequireDefault(require("../models/index"));
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var salt = _bcryptjs["default"].genSaltSync(10);
var checkUserEmail = function checkUserEmail(userEmail) {
  return new Promise( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(resolve, reject) {
      var user;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _index["default"].User.findOne({
              where: {
                email: userEmail
              }
            });
          case 3:
            user = _context.sent;
            if (user) {
              resolve(true);
            } else {
              resolve(false);
            }
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
var checkUserPhoneNumber = function checkUserPhoneNumber(userPhoneNumber) {
  return new Promise( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(resolve, reject) {
      var user;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _index["default"].User.findOne({
              where: {
                phoneNumber: userPhoneNumber
              }
            });
          case 3:
            user = _context2.sent;
            if (user) {
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
var hashUserPassword = function hashUserPassword(password) {
  return new Promise( /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(resolve, reject) {
      var hashPassWord;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _bcryptjs["default"].hashSync(password, salt);
          case 3:
            hashPassWord = _context3.sent;
            resolve(hashPassWord);
            _context3.next = 10;
            break;
          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);
            reject(_context3.t0);
          case 10:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[0, 7]]);
    }));
    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());
};
var handleUserRegister = function handleUserRegister(data) {
  return new Promise( /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(resolve, reject) {
      var isExistEmail, isExistPhoneNumber, hashPassword, user;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return checkUserEmail(data.email);
          case 3:
            isExistEmail = _context4.sent;
            _context4.next = 6;
            return checkUserPhoneNumber(data.phoneNumber);
          case 6:
            isExistPhoneNumber = _context4.sent;
            if (!isExistEmail) {
              _context4.next = 9;
              break;
            }
            return _context4.abrupt("return", resolve({
              status: 400,
              message: "Email is exist, please enter other email",
              data: ""
            }));
          case 9:
            if (!isExistPhoneNumber) {
              _context4.next = 11;
              break;
            }
            return _context4.abrupt("return", resolve({
              status: 400,
              message: "Phone number is exist, please enter other phone number",
              data: ""
            }));
          case 11:
            //hash user password
            hashPassword = _bcryptjs["default"].hashSync(data.password, salt);
            console.log(hashPassword);
            _context4.next = 15;
            return _index["default"].User.create({
              email: data.email,
              password: hashPassword,
              fullName: data.fullName,
              address: data.address,
              phoneNumber: data.phoneNumber,
              image: data.image,
              roleId: 3,
              type_register: 1
            });
          case 15:
            user = _context4.sent;
            resolve({
              status: 201,
              message: "User is created successfully",
              data: user
            });
            _context4.next = 22;
            break;
          case 19:
            _context4.prev = 19;
            _context4.t0 = _context4["catch"](0);
            reject(_context4.t0);
          case 22:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[0, 19]]);
    }));
    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }());
};
var handleUserLogin = function handleUserLogin(email, password) {
  return new Promise( /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(resolve, reject) {
      var userData, isExist, user, check, staffRestaurantMap;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            userData = {};
            _context5.next = 4;
            return checkUserEmail(email);
          case 4:
            isExist = _context5.sent;
            if (!isExist) {
              _context5.next = 29;
              break;
            }
            _context5.next = 8;
            return _index["default"].User.findOne({
              attributes: ["email", "roleId", "password", "fullName", "id", "phoneNumber", "image"],
              where: {
                email: email
              },
              raw: true
            });
          case 8:
            user = _context5.sent;
            if (!user) {
              _context5.next = 26;
              break;
            }
            _context5.next = 12;
            return _bcryptjs["default"].compare(password, user.password);
          case 12:
            check = _context5.sent;
            if (!check) {
              _context5.next = 23;
              break;
            }
            if (!(user.roleId === 2)) {
              _context5.next = 19;
              break;
            }
            _context5.next = 17;
            return _index["default"].StaffRestaurantMap.findOne({
              where: {
                staffId: user.id
              },
              raw: true
            });
          case 17:
            staffRestaurantMap = _context5.sent;
            user.restaurantId = staffRestaurantMap.restaurantId;
          case 19:
            resolve({
              status: 200,
              message: "OK",
              data: user
            });
            delete user.password;
            _context5.next = 24;
            break;
          case 23:
            resolve({
              status: 401,
              message: "Wrong password",
              data: ""
            });
          case 24:
            _context5.next = 27;
            break;
          case 26:
            resolve({
              status: 404,
              message: "User not found",
              data: ""
            });
          case 27:
            _context5.next = 30;
            break;
          case 29:
            //return error
            resolve({
              status: 404,
              message: "Your's Email isn't exist in our system, plz try other email",
              data: ""
            });
          case 30:
            _context5.next = 35;
            break;
          case 32:
            _context5.prev = 32;
            _context5.t0 = _context5["catch"](0);
            reject(_context5.t0);
          case 35:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[0, 32]]);
    }));
    return function (_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }());
};
var getAllUsers = function getAllUsers() {
  return new Promise( /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(resolve, reject) {
      var users;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _index["default"].User.findAll({
              raw: true
            });
          case 3:
            users = _context6.sent;
            resolve(users);
            _context6.next = 10;
            break;
          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6["catch"](0);
            reject(_context6.t0);
          case 10:
          case "end":
            return _context6.stop();
        }
      }, _callee6, null, [[0, 7]]);
    }));
    return function (_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }());
};
var getAllCodeUserService = function getAllCodeUserService(typeInput) {
  return new Promise( /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(resolve, reject) {
      var res, allcode;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            if (typeInput) {
              _context7.next = 5;
              break;
            }
            resolve({
              status: 400,
              message: "Missing required parameter"
            });
            _context7.next = 12;
            break;
          case 5:
            res = {};
            _context7.next = 8;
            return _index["default"].Allcode.findAll({
              where: {
                type: typeInput
              }
            });
          case 8:
            allcode = _context7.sent;
            res.status = 0;
            res.data = allcode;
            resolve(res);
          case 12:
            _context7.next = 17;
            break;
          case 14:
            _context7.prev = 14;
            _context7.t0 = _context7["catch"](0);
            reject(_context7.t0);
          case 17:
          case "end":
            return _context7.stop();
        }
      }, _callee7, null, [[0, 14]]);
    }));
    return function (_x13, _x14) {
      return _ref7.apply(this, arguments);
    };
  }());
};
var createNewUser = function createNewUser(data) {
  return new Promise( /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(resolve, reject) {
      var isExistEmail, isExistPhoneNumber, hashPassword, user;
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            _context8.next = 3;
            return checkUserEmail(data.email);
          case 3:
            isExistEmail = _context8.sent;
            _context8.next = 6;
            return checkUserPhoneNumber(data.phoneNumber);
          case 6:
            isExistPhoneNumber = _context8.sent;
            if (!isExistEmail) {
              _context8.next = 9;
              break;
            }
            return _context8.abrupt("return", resolve({
              status: 400,
              message: "Email is exist, please enter other email",
              data: ""
            }));
          case 9:
            if (!isExistPhoneNumber) {
              _context8.next = 11;
              break;
            }
            return _context8.abrupt("return", resolve({
              status: 400,
              message: "Phone number is exist, please enter other phone number",
              data: ""
            }));
          case 11:
            //hash user password
            hashPassword = _bcryptjs["default"].hashSync(data.password, salt);
            _context8.next = 14;
            return _index["default"].User.create({
              email: data.email,
              password: hashPassword.toString(),
              fullName: data.fullName,
              address: data.address,
              phoneNumber: data.phoneNumber,
              image: data.image,
              roleId: data.roleId,
              type_register: 1
            });
          case 14:
            user = _context8.sent;
            resolve({
              status: 201,
              message: "User is created successfully",
              data: user
            });
            _context8.next = 21;
            break;
          case 18:
            _context8.prev = 18;
            _context8.t0 = _context8["catch"](0);
            reject(_context8.t0);
          case 21:
          case "end":
            return _context8.stop();
        }
      }, _callee8, null, [[0, 18]]);
    }));
    return function (_x15, _x16) {
      return _ref8.apply(this, arguments);
    };
  }());
};
var getUserInfoById = function getUserInfoById(userId) {
  return new Promise( /*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(resolve, reject) {
      var user;
      return _regeneratorRuntime().wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            _context9.next = 3;
            return _index["default"].User.findOne({
              where: {
                id: userId
              },
              raw: true
            });
          case 3:
            user = _context9.sent;
            if (user) {
              resolve({
                status: 200,
                message: "get user by id successfully",
                data: user
              });
            } else {
              resolve({
                status: 404,
                message: "User not found",
                data: ""
              });
            }
            _context9.next = 10;
            break;
          case 7:
            _context9.prev = 7;
            _context9.t0 = _context9["catch"](0);
            reject(_context9.t0);
          case 10:
          case "end":
            return _context9.stop();
        }
      }, _callee9, null, [[0, 7]]);
    }));
    return function (_x17, _x18) {
      return _ref9.apply(this, arguments);
    };
  }());
};
var updateUserData = function updateUserData(data) {
  return new Promise( /*#__PURE__*/function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(resolve, reject) {
      var user, isExistEmail, isExistPhoneNumber, key, staffRestaurantMap;
      return _regeneratorRuntime().wrap(function _callee10$(_context10) {
        while (1) switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            if (data.id) {
              _context10.next = 3;
              break;
            }
            return _context10.abrupt("return", resolve({
              status: 400,
              message: "Missing required parameter"
            }));
          case 3:
            _context10.next = 5;
            return _index["default"].User.findOne({
              where: {
                id: data.id
              },
              raw: false
            });
          case 5:
            user = _context10.sent;
            if (!user) {
              _context10.next = 44;
              break;
            }
            if (!data.email) {
              _context10.next = 13;
              break;
            }
            _context10.next = 10;
            return checkUserEmail(data.email);
          case 10:
            isExistEmail = _context10.sent;
            if (!isExistEmail) {
              _context10.next = 13;
              break;
            }
            return _context10.abrupt("return", resolve({
              status: 400,
              message: "Email is exist, please enter other email",
              data: ""
            }));
          case 13:
            if (!data.phoneNumber) {
              _context10.next = 19;
              break;
            }
            _context10.next = 16;
            return checkUserPhoneNumber(data.phoneNumber);
          case 16:
            isExistPhoneNumber = _context10.sent;
            if (!isExistPhoneNumber) {
              _context10.next = 19;
              break;
            }
            return _context10.abrupt("return", resolve({
              status: 400,
              message: "Phone number is exist, please enter other phone number",
              data: ""
            }));
          case 19:
            _context10.t0 = _regeneratorRuntime().keys(data);
          case 20:
            if ((_context10.t1 = _context10.t0()).done) {
              _context10.next = 38;
              break;
            }
            key = _context10.t1.value;
            if (!(key !== "id")) {
              _context10.next = 36;
              break;
            }
            user[key] = data[key];
            if (!(key === "restaurantId")) {
              _context10.next = 36;
              break;
            }
            _context10.next = 27;
            return _index["default"].StaffRestaurantMap.findOne({
              where: {
                staffId: data.id
              },
              raw: false
            });
          case 27:
            staffRestaurantMap = _context10.sent;
            if (!staffRestaurantMap) {
              _context10.next = 34;
              break;
            }
            staffRestaurantMap.restaurantId = data.restaurantId;
            _context10.next = 32;
            return staffRestaurantMap.save();
          case 32:
            _context10.next = 36;
            break;
          case 34:
            _context10.next = 36;
            return _index["default"].StaffRestaurantMap.create({
              staffId: data.id,
              restaurantId: data.restaurantId
            });
          case 36:
            _context10.next = 20;
            break;
          case 38:
            user.updateAt = new Date();
            _context10.next = 41;
            return user.save();
          case 41:
            return _context10.abrupt("return", resolve({
              status: 200,
              message: "Update the user successfully!",
              data: user
            }));
          case 44:
            return _context10.abrupt("return", resolve({
              status: 404,
              message: "User not found!",
              data: ""
            }));
          case 45:
            _context10.next = 50;
            break;
          case 47:
            _context10.prev = 47;
            _context10.t2 = _context10["catch"](0);
            console.log(_context10.t2);
          case 50:
          case "end":
            return _context10.stop();
        }
      }, _callee10, null, [[0, 47]]);
    }));
    return function (_x19, _x20) {
      return _ref10.apply(this, arguments);
    };
  }());
};
var changePassword = function changePassword(data) {
  return new Promise( /*#__PURE__*/function () {
    var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(resolve, reject) {
      var user, check;
      return _regeneratorRuntime().wrap(function _callee11$(_context11) {
        while (1) switch (_context11.prev = _context11.next) {
          case 0:
            _context11.prev = 0;
            if (!(!data.id || !data.currentPassword || !data.newPassword)) {
              _context11.next = 3;
              break;
            }
            return _context11.abrupt("return", resolve({
              status: 400,
              message: "Missing required parameter"
            }));
          case 3:
            _context11.next = 5;
            return _index["default"].User.findOne({
              where: {
                id: data.id
              },
              raw: false
            });
          case 5:
            user = _context11.sent;
            if (!user) {
              _context11.next = 20;
              break;
            }
            _context11.next = 9;
            return _bcryptjs["default"].compare(data.currentPassword, user.password);
          case 9:
            check = _context11.sent;
            if (check) {
              _context11.next = 12;
              break;
            }
            return _context11.abrupt("return", resolve({
              status: 400,
              message: "Current password is incorrect!"
            }));
          case 12:
            _context11.next = 14;
            return _bcryptjs["default"].hashSync(data.newPassword, salt);
          case 14:
            user.password = _context11.sent;
            _context11.next = 17;
            return user.save();
          case 17:
            return _context11.abrupt("return", resolve({
              status: 200,
              message: "Change password successfully!",
              data: user
            }));
          case 20:
            return _context11.abrupt("return", resolve({
              status: 404,
              message: "User not found!",
              data: ""
            }));
          case 21:
            _context11.next = 26;
            break;
          case 23:
            _context11.prev = 23;
            _context11.t0 = _context11["catch"](0);
            console.log(_context11.t0);
          case 26:
          case "end":
            return _context11.stop();
        }
      }, _callee11, null, [[0, 23]]);
    }));
    return function (_x21, _x22) {
      return _ref11.apply(this, arguments);
    };
  }());
};
var deleteUser = function deleteUser(userId) {
  return new Promise( /*#__PURE__*/function () {
    var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(resolve, reject) {
      var user;
      return _regeneratorRuntime().wrap(function _callee12$(_context12) {
        while (1) switch (_context12.prev = _context12.next) {
          case 0:
            _context12.prev = 0;
            _context12.next = 3;
            return _index["default"].User.findOne({
              where: {
                id: userId
              }
            });
          case 3:
            user = _context12.sent;
            if (user) {
              _context12.next = 6;
              break;
            }
            return _context12.abrupt("return", resolve({
              status: 404,
              message: "User not found!",
              data: ""
            }));
          case 6:
            if (!user) {
              _context12.next = 11;
              break;
            }
            _context12.next = 9;
            return _index["default"].User.destroy({
              where: {
                id: userId
              }
            });
          case 9:
            _context12.next = 11;
            return _index["default"].StaffRestaurantMap.destroy({
              where: {
                staffId: userId
              }
            });
          case 11:
            return _context12.abrupt("return", resolve({
              status: 200,
              message: "user is deleted",
              data: ""
            }));
          case 14:
            _context12.prev = 14;
            _context12.t0 = _context12["catch"](0);
            reject(_context12.t0);
          case 17:
          case "end":
            return _context12.stop();
        }
      }, _callee12, null, [[0, 14]]);
    }));
    return function (_x23, _x24) {
      return _ref12.apply(this, arguments);
    };
  }());
};
var createNewStaff = function createNewStaff(data) {
  return new Promise( /*#__PURE__*/function () {
    var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(resolve, reject) {
      var isExistEmail, isExistPhoneNumber, hashPassword, user, staffRestaurantMap;
      return _regeneratorRuntime().wrap(function _callee13$(_context13) {
        while (1) switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
            _context13.next = 3;
            return checkUserEmail(data.email);
          case 3:
            isExistEmail = _context13.sent;
            _context13.next = 6;
            return checkUserPhoneNumber(data.phoneNumber);
          case 6:
            isExistPhoneNumber = _context13.sent;
            if (!isExistEmail) {
              _context13.next = 9;
              break;
            }
            return _context13.abrupt("return", resolve({
              status: 400,
              message: "Email is exist, please enter other email",
              data: ""
            }));
          case 9:
            if (!isExistPhoneNumber) {
              _context13.next = 11;
              break;
            }
            return _context13.abrupt("return", resolve({
              status: 400,
              message: "Phone number is exist, please enter other phone number",
              data: ""
            }));
          case 11:
            //hash user password
            hashPassword = _bcryptjs["default"].hashSync(data.password, salt);
            _context13.next = 14;
            return _index["default"].User.create({
              email: data.email,
              password: hashPassword.toString(),
              fullName: data.fullName,
              address: data.address,
              phoneNumber: data.phoneNumber,
              image: null,
              roleId: 2,
              type_register: 1
            });
          case 14:
            user = _context13.sent;
            _context13.next = 17;
            return _index["default"].StaffRestaurantMap.create({
              staffId: user.id,
              restaurantId: data.restaurantId
            });
          case 17:
            staffRestaurantMap = _context13.sent;
            resolve({
              status: 201,
              message: "Staff is created successfully",
              data: {
                user: user,
                staffRestaurantMap: staffRestaurantMap
              }
            });
            _context13.next = 24;
            break;
          case 21:
            _context13.prev = 21;
            _context13.t0 = _context13["catch"](0);
            reject(_context13.t0);
          case 24:
          case "end":
            return _context13.stop();
        }
      }, _callee13, null, [[0, 21]]);
    }));
    return function (_x25, _x26) {
      return _ref13.apply(this, arguments);
    };
  }());
};
module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUsers: getAllUsers,
  getAllCodeUserService: getAllCodeUserService,
  handleUserRegister: handleUserRegister,
  createNewUser: createNewUser,
  getUserInfoById: getUserInfoById,
  updateUserData: updateUserData,
  deleteUser: deleteUser,
  createNewStaff: createNewStaff,
  changePassword: changePassword
};