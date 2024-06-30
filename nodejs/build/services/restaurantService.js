"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _index = _interopRequireDefault(require("../models/index"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var _ = require("lodash");

// let getAllRestaurants = (restaurantId) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let restaurants = "";
//       if (restaurantId === "ALL") {
//         restaurants = await db.Restaurant.findAll({});
//       }
//       if (restaurantId && restaurantId !== "ALL") {
//         restaurants = await db.Restaurant.findOne({
//           where: { id: restaurantId },
//         });
//       }
//       resolve({ restaurants, data: restaurants });
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

var getAllRestaurants = function getAllRestaurants() {
  return new Promise( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(resolve, reject) {
      var restaurants;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _index["default"].Restaurant.findAll({
              where: {
                isDelete: "0"
              },
              attributes: ["id", "name", "address", "provinceId", "image", "latitude", "longitude", "isOpen"]
            });
          case 3:
            restaurants = _context.sent;
            resolve({
              status: 200,
              message: "OK",
              data: restaurants
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
var getAllTypeNames = function getAllTypeNames() {
  return new Promise( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(resolve, reject) {
      var typeNames;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _index["default"].Type.findAll({
              attributes: {
                exclude: ["image"]
              }
            });
          case 3:
            typeNames = _context2.sent;
            resolve({
              errCode: 0,
              data: typeNames
            });
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
var checkExistRestaurant = function checkExistRestaurant(address) {
  return new Promise( /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(resolve, reject) {
      var res;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _index["default"].Restaurant.findOne({
              where: {
                address: address
              }
            });
          case 3:
            res = _context3.sent;
            if (res) {
              resolve(true);
            } else {
              resolve(false);
            }
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
var createNewRestaurant = function createNewRestaurant(data) {
  return new Promise( /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(resolve, reject) {
      var isExistRestaurant, restaurant;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return checkExistRestaurant(data.address);
          case 3:
            isExistRestaurant = _context4.sent;
            if (!isExistRestaurant) {
              _context4.next = 6;
              break;
            }
            return _context4.abrupt("return", resolve({
              status: 400,
              message: "Restaurant is exist, please enter other restaurant",
              data: ""
            }));
          case 6:
            _context4.next = 8;
            return _index["default"].Restaurant.create({
              name: data.name,
              provinceId: data.provinceId,
              image: data.image,
              address: data.address,
              longitude: data.longitude,
              latitude: data.latitude,
              isOpen: 0,
              isDelete: "0"
            });
          case 8:
            restaurant = _context4.sent;
            resolve({
              status: 200,
              message: "OK",
              data: restaurant
            });
            _context4.next = 15;
            break;
          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4["catch"](0);
            reject(_context4.t0);
          case 15:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[0, 12]]);
    }));
    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }());
};
var deleteRestaurant = function deleteRestaurant(restaurantId) {
  return new Promise( /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(resolve, reject) {
      var restaurant;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _index["default"].Restaurant.findOne({
              where: {
                id: restaurantId
              },
              raw: false
            });
          case 3:
            restaurant = _context5.sent;
            if (restaurant) {
              _context5.next = 8;
              break;
            }
            return _context5.abrupt("return", resolve({
              status: 404,
              message: "restaurant is not exist!",
              data: ""
            }));
          case 8:
            restaurant.isDelete = "1";
            restaurant.isOpen = "0";
            _context5.next = 12;
            return restaurant.save();
          case 12:
            return _context5.abrupt("return", resolve({
              status: 200,
              message: "Delete the table succeeds! (Restaurant still exists in db)",
              data: restaurant
            }));
          case 13:
            _context5.next = 18;
            break;
          case 15:
            _context5.prev = 15;
            _context5.t0 = _context5["catch"](0);
            reject(_context5.t0);
          case 18:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[0, 15]]);
    }));
    return function (_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }());
};
var updateRestaurantData = function updateRestaurantData(data) {
  return new Promise( /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(resolve, reject) {
      var restaurant, key;
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
            return _index["default"].Restaurant.findOne({
              where: {
                id: data.id
              },
              raw: false
            });
          case 5:
            restaurant = _context6.sent;
            if (!restaurant) {
              _context6.next = 13;
              break;
            }
            for (key in data) {
              if (key !== "id" && data[key] !== null) {
                restaurant[key] = data[key];
              }
            }
            _context6.next = 10;
            return restaurant.save();
          case 10:
            return _context6.abrupt("return", resolve({
              status: 200,
              message: "Update the restaurant succeeds!",
              data: restaurant
            }));
          case 13:
            return _context6.abrupt("return", resolve({
              status: 404,
              message: "Restaurant is not exist",
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

// let getAllCodeService = (typeInput) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       if (!typeInput) {
//         resolve({
//           errCode: 1,
//           message: "Missing required parameter",
//         });
//       } else {
//         let res = {};
//         let allcode = await db.Allcode.findAll({
//           where: { type: typeInput },
//         });
//         res.errCode = 0;
//         res.data = allcode;
//         resolve(res);
//       }
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

// let getTopRestaurant = (limitInput) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let restaurants = await db.Restaurant.findAll({
//         limit: limitInput,
//         order: [["createdAt", "DESC"]],
//       });
//       resolve({
//         status: 200,
//         data: restaurants,
//       });
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

var getDetailRestaurantById = function getDetailRestaurantById(inputId) {
  return new Promise( /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(resolve, reject) {
      var data;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            if (inputId) {
              _context7.next = 5;
              break;
            }
            return _context7.abrupt("return", resolve({
              status: 400,
              message: "Missing required parameter!",
              data: ""
            }));
          case 5:
            _context7.next = 7;
            return _index["default"].Restaurant.findOne({
              where: {
                id: inputId
              }
            });
          case 7:
            data = _context7.sent;
            if (!data) {
              _context7.next = 12;
              break;
            }
            return _context7.abrupt("return", resolve({
              status: 200,
              message: "OK",
              data: data
            }));
          case 12:
            return _context7.abrupt("return", resolve({
              status: 404,
              message: "Restaurant is not exist",
              data: ""
            }));
          case 13:
            _context7.next = 18;
            break;
          case 15:
            _context7.prev = 15;
            _context7.t0 = _context7["catch"](0);
            reject(_context7.t0);
          case 18:
          case "end":
            return _context7.stop();
        }
      }, _callee7, null, [[0, 15]]);
    }));
    return function (_x13, _x14) {
      return _ref7.apply(this, arguments);
    };
  }());
};

// let bulkCreateSchedule = (data) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       console.log("Check data 1", data);
//       if (!data.arrSchedule || !data.restaurantId || !data.formatedDate) {
//         resolve({
//           errCode: 1,
//           message: "Missing reqiured parameter!",
//         });
//       } else {
//         let schedule = data.arrSchedule;
//         if (schedule && schedule.length > 0) {
//           schedule = schedule.map((item) => {
//             console.log("item:", item);
//             //item.maxNumber = MAX_NUMBER_SCHEDULE;
//             //item.date = new Date(item.date).getTime();
//             return item;
//           });
//         }
//         console.log("Data:", schedule);

//         //convert date
//         let existing = await db.Schedule.findAll({
//           where: { restaurantId: data.restaurantId, date: data.formatedDate },
//           attributes: ["restaurantId", "date", "timeType"],
//           raw: true,
//         });

//         // if (existing && existing.length > 0) {
//         //   existing = existing.map((item) => {
//         //     item.date = new Date(item.date).getTime();
//         //     return item;
//         //   });
//         // }

//         let toCreate = _.differenceWith(schedule, existing, (a, b) => {
//           return a.timeType === b.timeType && +a.date === +b.date;
//         });

//         console.log("check different: ", toCreate);

//         if (toCreate && toCreate.length > 0) {
//           await db.Schedule.bulkCreate(toCreate);
//         }
//         resolve({
//           errCode: 0,
//           message: "OK",
//         });
//       }
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

//let getScheduleByDate = (restaurantId, date) => {};

// let getExtraInfoRestaurantById = (restaurantId) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       if (!restaurantId) {
//         resolve({
//           errCode: 1,
//           message: "Missing required parameter!",
//         });
//       } else {
//         let data = await db.Restaurant.findOne({
//           where: { id: restaurantId },
//           attributes: {
//             exclude: ["id", "restaurantId"],
//           },
//           include: [
//             {
//               model: db.Allcode,
//               as: "provinceData",
//               attributes: ["valueEn", "valueVi"],
//             },
//             {
//               model: db.Markdown,
//               attributes: ["description", "contentHTML", "contentMarkdown"],
//             },
//           ],
//           raw: false,
//           nest: true,
//         });

//         if (data && data.image) {
//           data.image = new Buffer(data.image, "base64").toString("binary");
//         }

//         if (!data) data = {};
//         resolve({
//           errCode: 0,
//           data: data,
//         });
//       }
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

// let getProfileRestaurantById = (restaurantId) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       if (!restaurantId) {
//         resolve({
//           errCode: 1,
//           message: "Missing required parameter!",
//         });
//       } else {
//         let data = await db.Restaurant.findOne({
//           where: { id: restaurantId },
//           attributes: {
//             exclude: ["id", "restaurantId"],
//           },
//           include: [
//             {
//               model: db.Allcode,
//               as: "provinceData",
//               attributes: ["valueEn", "valueVi"],
//             },
//             { model: db.Type, attributes: ["name", "id"] },
//           ],
//           raw: false,
//           nest: true,
//         });

//         if (!data) data = {};
//         resolve({
//           errCode: 0,
//           data: data,
//         });
//       }
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

// let saveDetailInfoRestaurant = (inputData) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       if (
//         !inputData.restaurantId ||
//         !inputData.contentHTML ||
//         !inputData.contentMarkdown ||
//         !inputData.action
//       ) {
//         resolve({
//           errCode: 1,
//           message: "Missing parameter",
//         });
//       } else {
//         if (inputData.action === "CREATE") {
//           await db.Markdown.create({
//             contentHTML: inputData.contentHTML,
//             contentMarkdown: inputData.contentMarkdown,
//             description: inputData.description,
//             restaurantId: inputData.restaurantId,
//           });
//         } else if (inputData.action === "EDIT") {
//           let restaurantMarkdown = await db.Markdown.findOne({
//             where: { restaurantId: inputData.restaurantId },
//             raw: false,
//           });
//           if (restaurantMarkdown) {
//             restaurantMarkdown.contentHTML = inputData.contentHTML;
//             restaurantMarkdown.contentMarkdown = inputData.contentMarkdown;
//             restaurantMarkdown.description = inputData.description;
//             restaurantMarkdown.updateAt = new Date();

//             await restaurantMarkdown.save();
//           }
//         }

//         resolve({
//           errCode: 0,
//           message: "Save info restaurant succees!",
//         });
//       }
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

var getRestaurantByLocation = function getRestaurantByLocation(location) {
  return new Promise( /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(resolve, reject) {
      var restaurants;
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            if (location) {
              _context8.next = 5;
              break;
            }
            resolve({
              status: 400,
              message: "Missing required parameter!",
              data: ""
            });
            _context8.next = 16;
            break;
          case 5:
            restaurants = [];
            if (!(location === "ALL")) {
              _context8.next = 12;
              break;
            }
            _context8.next = 9;
            return _index["default"].Restaurant.findAll({});
          case 9:
            restaurants = _context8.sent;
            _context8.next = 15;
            break;
          case 12:
            _context8.next = 14;
            return _index["default"].Restaurant.findAll({
              where: {
                provinceId: location
              }
            });
          case 14:
            restaurants = _context8.sent;
          case 15:
            if (restaurants && restaurants.length != 0) {
              resolve({
                status: 200,
                message: "OK",
                data: restaurants
              });
            } else {
              resolve({
                status: 200,
                message: "There is not any restaurant.",
                data: ""
              });
            }
          case 16:
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
module.exports = {
  createNewRestaurant: createNewRestaurant,
  deleteRestaurant: deleteRestaurant,
  updateRestaurantData: updateRestaurantData,
  getDetailRestaurantById: getDetailRestaurantById,
  getAllRestaurants: getAllRestaurants,
  getAllTypeNames: getAllTypeNames,
  getRestaurantByLocation: getRestaurantByLocation
};