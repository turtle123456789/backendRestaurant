"use strict";

var _express = _interopRequireDefault(require("express"));
var _homeController = _interopRequireDefault(require("../controllers/homeController"));
var _userController = _interopRequireDefault(require("../controllers/userController"));
var _restaurantController = _interopRequireDefault(require("../controllers/restaurantController"));
var _customerController = _interopRequireDefault(require("../controllers/customerController"));
var _typeController = _interopRequireDefault(require("../controllers/typeController"));
var _dishController = _interopRequireDefault(require("../controllers/dishController"));
var _staffController = _interopRequireDefault(require("../controllers/staffController"));
var _tableController = _interopRequireDefault(require("../controllers/tableController"));
var _orderController = _interopRequireDefault(require("../controllers/orderController"));
var _paymentController = _interopRequireDefault(require("../controllers/paymentController"));
var _categoryController = _interopRequireDefault(require("../controllers/categoryController"));
var _comboController = _interopRequireDefault(require("../controllers/comboController"));
var _adminController = _interopRequireDefault(require("../controllers/adminController"));
var _invoiceController = _interopRequireDefault(require("../controllers/invoiceController"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
var initWebRoutes = function initWebRoutes(app, io) {
  router.get("/", _homeController["default"].getHomePage);
  router.get("/about", _homeController["default"].getAboutPage);
  router.get("/crud", _homeController["default"].getCRUD);
  router.post("/post-crud", _homeController["default"].postCRUD);
  router.get("/get-crud", _homeController["default"].displayGetCRUD);
  router.get("/edit-crud", _homeController["default"].getEditCRUD);
  router.post("/put-crud", _homeController["default"].putCRUD);
  router.get("/delete-crud", _homeController["default"].deleteCRUD);
  router.post("/api/login", _userController["default"].handleLogin);
  router.post("/api/register", _userController["default"].handleRegister);
  router.post("/api/create-new-user", _userController["default"].handleCreateNewUser);
  router.post("/api/create-new-staff", function (req, res) {
    return _userController["default"].handleCreateNewStaff(req, res, io);
  });
  router.post("/api/edit-user", function (req, res) {
    return _userController["default"].handleEditUser(req, res, io);
  });
  router.post("/api/delete-user", function (req, res) {
    return _userController["default"].handleDeleteUser(req, res, io);
  });
  router.get("/api/get-detail-user-by-id", _userController["default"].handleGetDetailUserById);
  router.get("/api/get-detail-table-by-id", _tableController["default"].handleGetDetailTableById);
  router.post("/api/create-new-table", function (req, res) {
    return _tableController["default"].handleCreateNewTable(req, res, io);
  });
  router.post("/api/edit-table", _tableController["default"].handleEditTable);
  router.post("/api/delete-table", function (req, res) {
    return _tableController["default"].handleDeleteTable(req, res, io);
  });
  router.get("/api/get-all-tables", _tableController["default"].handleGetAllTables);
  router.get("/api/get-all-users", _userController["default"].handleGetAllUsers);
  router.post("/api/create-new-restaurant", function (req, res) {
    return _restaurantController["default"].handleCreateNewRestaurant(req, res, io);
  });
  router.post("/api/edit-restaurant", function (req, res) {
    return _restaurantController["default"].handleEditRestaurant(req, res, io);
  });
  router.post("/api/delete-restaurant", function (req, res) {
    return _restaurantController["default"].handleDeleteRestaurant(req, res, io);
  });
  router.get("/api/get-detail-restaurant-by-id", _restaurantController["default"].handleGetDetailRestaurantById);
  router.get("/api/get-restaurant-by-location", _restaurantController["default"].handleGetRestaurantByLocation);
  router.post("/api/create-new-type", _typeController["default"].handleCreateType);
  router.get("/api/get-all-types", _typeController["default"].handleGetAllTypes);
  router.get("/api/get-detail-type-by-id", _typeController["default"].handleGetDetailTypeById);
  router.get("/api/get-all-restaurants", _restaurantController["default"].handleGetAllRestaurants);
  router.post("/api/book-table", function (req, res) {
    return _customerController["default"].handleBookTable(req, res, io);
  });
  router.post("/api/create-new-orderItem", _customerController["default"].handleCreateNewOrderItem);
  router.post("/api/customer-pre-order-dish", _customerController["default"].handleCustomerPreOrderDish);
  router.get("/api/get-all-dishes", _dishController["default"].handleGetAllDishes);
  router.post("/api/create-new-dish", function (req, res) {
    return _dishController["default"].handleCreateNewDish(req, res, io);
  });
  router.post("/api/edit-dish", function (req, res) {
    return _dishController["default"].handleEditDish(req, res, io);
  });
  router.post("/api/delete-dish", function (req, res) {
    return _dishController["default"].handleDeleteDish(req, res, io);
  });
  router.get("/api/get-detail-dish-by-id", _dishController["default"].handleGetDetailDishById);
  router.get("/api/get-all-dish-names", _dishController["default"].handleGetAllDishNames);
  router.get("/api/get-all-dishRestaurant-names", _dishController["default"].handleGetAllDishRestaurantNames);
  router.get("/api/get-all-combos", _comboController["default"].handleGetAllCombos);
  router.post("/api/create-new-combo", _comboController["default"].handleCreateCombo);
  router["delete"]("/api/delete-combo", _comboController["default"].handleDeleteCombo);
  router.put("/api/edit-combo", _comboController["default"].handleEditCombo);
  router.post("/api/get-all-categories", _categoryController["default"].handleGetAllCategories);
  router.post("/api/create-new-category", _categoryController["default"].handleCreateNewCategory);
  router.post("/api/edit-category", function (req, res) {
    return _categoryController["default"].handleEditCategory(req, res, io);
  });
  router.post("/api/delete-category", function (req, res) {
    return _categoryController["default"].handleDeleteCategory(req, res, io);
  });
  router.get("/api/get-list-customer-for-staff", _staffController["default"].handleGetListCustomerForStaff);
  router.get("/api/get-restaurant-by-staffId", _staffController["default"].handleGetRestaurantByStaffId);
  router.post("/api/update-table", function (req, res) {
    return _staffController["default"].handleUpdateTable(req, res, io);
  });
  router.get("/api/get-all-orders", _orderController["default"].handleGetAllOrders);
  router.put("/api/edit-order", _orderController["default"].editHandler);
  router["delete"]("api/delete-order", _orderController["default"].cancelHandler);
  router.post("/api/choose-table", _orderController["default"].chooseTableHandler);
  router.patch("/api/free-table", _tableController["default"].freeTableHandler);
  router.post("/api/search-table", _tableController["default"].handleSearchTable);
  router.post("/api/update-status-order", _orderController["default"].handleUpdateStatusOrder);
  router.post("/api/get-all-orders-of-customer", _orderController["default"].handleGetAllOrderByCustomerPhoneNumber);
  router.post("/api/update-status-order", _orderController["default"].handleUpdateStatusOrder);
  router.post("/api/get-all-orders-by-restaurantId", _orderController["default"].handleGetAllOrdersByRestaurantId);
  router.post("/api/get-detail-order-by-orderId", _orderController["default"].handleGetDetailOrderByOrderId);
  router.post("/api/update-order", function (req, res) {
    return _orderController["default"].handleUpdateOrder(req, res, io);
  });
  router.post("/api/update-order-item", _orderController["default"].handleUpdateOrderItem);
  router.post("/api/checkout-order", function (req, res) {
    return _orderController["default"].handleCheckoutOrder(req, res, io);
  });
  router.post("/api/create-invoice", function (req, res) {
    return _invoiceController["default"].handleCreateInvoice(req, res, io);
  });
  router.post("/api/get-available-tables", _tableController["default"].handleGetAvailableTables);
  router.post("/api/get-all-tables-by-restaurantId", _tableController["default"].handleGetAllTableByRestaurantId);
  router.post("/api/create-order-by-staff", _staffController["default"].createOrder);
  router.post("/api/create-payment", _paymentController["default"].handlePaymentWithVNP);
  router.get("/api/vnpay_return", function (req, res) {
    return _paymentController["default"].handlePaymentResultWithVNP(req, res, io);
  });
  router.post("/api/get-all-staff", _adminController["default"].handleGetAllStaff);
  router.post("/api/change-password", _userController["default"].handleChangePassword);
  router.post("/api/get-all-order-by-customerId", _orderController["default"].handleGetAllOrderByCustomerId);
  return app.use("/", router);
};
module.exports = initWebRoutes;