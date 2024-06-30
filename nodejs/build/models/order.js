"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var _require = require("sequelize"),
  Model = _require.Model;
module.exports = function (sequelize, DataTypes) {
  var Order = /*#__PURE__*/function (_Model) {
    function Order() {
      _classCallCheck(this, Order);
      return _callSuper(this, Order, arguments);
    }
    _inherits(Order, _Model);
    return _createClass(Order, null, [{
      key: "associate",
      value:
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      function associate(models) {
        // define association here
        // Order.belongsTo(models.User, {
        //   foreignKey: "customerId",
        //   targetKey: "id",
        //   as: "customerData",
        // });
        // Order.hasMany(models.Table, {
        //   onUpdate: "cascade",
        //   hooks: true,
        // });
        Order.hasMany(models.OrderItem, {
          onUpdate: "cascade",
          hooks: true
        });
        Order.hasMany(models.OrderTable, {
          foreignKey: "orderId"
        });
        Order.belongsTo(models.Restaurant, {
          foreignKey: "restaurantId",
          targetKey: "id",
          as: "restaurantData"
        });
      }
    }]);
  }(Model);
  Order.init({
    resDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Please enter reservation date!"
        }
        // isDateInThePast(value) {
        //   const currDate = dateTimeValidator.asDateString(new Date());
        //   if (dateTimeValidator.isDateInThePast(currDate, value))
        //     throw new Error("Given date is in the past!");
        // },
      }
    },
    resTime: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Please enter reservation time!"
        }
      }
    },
    people: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          arg: true,
          msg: "Should be an integer value!"
        },
        min: {
          args: [1],
          msg: "One person at least!"
        },
        max: {
          args: [20],
          msg: "Maximum 20 people per reservation!"
        }
      }
    },
    resStatus: {
      type: DataTypes.ENUM("pending", "confirmed", "seated", "done", "cancel"),
      allowNull: false,
      defaultValue: "pending"
    },
    restaurantId: DataTypes.INTEGER,
    fullName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    totalAmount: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0 // mặc định ban đầu là 0
    },
    depositAmount: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0 // mặc định ban đầu là 0
    },
    // Thêm trường thông tin của giao dịch thanh toán
    paymentStatus: {
      type: DataTypes.ENUM("pending", "deposited", "paid", "refunded"),
      allowNull: true,
      defaultValue: "pending"
    },
    refundedAmount: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: 0 // Số tiền đã hoàn trả, mặc định ban đầu là 0
    },
    cusId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize: sequelize,
    modelName: "Order"
  });
  return Order;
};