import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import restaurantController from "../controllers/restaurantController";
import customerController from "../controllers/customerController";
import typeController from "../controllers/typeController";
import dishController from "../controllers/dishController";
import staffController from "../controllers/staffController";
import tableController from "../controllers/tableController";
import orderController from "../controllers/orderController";
import paymentController from "../controllers/paymentController";
import categoryController from "../controllers/categoryController";
import comboController from "../controllers/comboController";
import adminController from "../controllers/adminController";
import invoiceController from "../controllers/invoiceController";

let router = express.Router();

let initWebRoutes = (app, io) => {
  router.get("/", homeController.getHomePage);
  router.get("/about", homeController.getAboutPage);
  router.get("/crud", homeController.getCRUD);

  router.post("/post-crud", homeController.postCRUD);
  router.get("/get-crud", homeController.displayGetCRUD);
  router.get("/edit-crud", homeController.getEditCRUD);

  router.post("/put-crud", homeController.putCRUD);
  router.get("/delete-crud", homeController.deleteCRUD);

  router.post("/api/login", userController.handleLogin);
  router.post("/api/register", userController.handleRegister);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.post("/api/create-new-staff", (req, res) =>
    userController.handleCreateNewStaff(req, res, io)
  );
  router.post("/api/edit-user", (req, res) =>
    userController.handleEditUser(req, res, io)
  );
  router.post("/api/delete-user", (req, res) =>
    userController.handleDeleteUser(req, res, io)
  );
  router.get(
    "/api/get-detail-user-by-id",
    userController.handleGetDetailUserById
  );

  router.get(
    "/api/get-detail-table-by-id",
    tableController.handleGetDetailTableById
  );

  router.post("/api/create-new-table", (req, res) =>
    tableController.handleCreateNewTable(req, res, io)
  );
  router.post("/api/edit-table", tableController.handleEditTable);
  router.post("/api/delete-table", (req, res) =>
    tableController.handleDeleteTable(req, res, io)
  );

  router.get("/api/get-all-tables", tableController.handleGetAllTables);

  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.post("/api/create-new-restaurant", (req, res) =>
    restaurantController.handleCreateNewRestaurant(req, res, io)
  );
  router.post("/api/edit-restaurant", (req, res) =>
    restaurantController.handleEditRestaurant(req, res, io)
  );
  router.post("/api/delete-restaurant", (req, res) =>
    restaurantController.handleDeleteRestaurant(req, res, io)
  );

  router.get(
    "/api/get-detail-restaurant-by-id",
    restaurantController.handleGetDetailRestaurantById
  );

  router.get(
    "/api/get-restaurant-by-location",
    restaurantController.handleGetRestaurantByLocation
  );

  router.post("/api/create-new-type", typeController.handleCreateType);
  router.get("/api/get-all-types", typeController.handleGetAllTypes);
  router.get(
    "/api/get-detail-type-by-id",
    typeController.handleGetDetailTypeById
  );

  router.get(
    "/api/get-all-restaurants",
    restaurantController.handleGetAllRestaurants
  );

  router.post("/api/book-table", (req, res) =>
    customerController.handleBookTable(req, res, io)
  );
  router.post(
    "/api/create-new-orderItem",
    customerController.handleCreateNewOrderItem
  );
  router.post(
    "/api/customer-pre-order-dish",
    customerController.handleCustomerPreOrderDish
  );

  router.get("/api/get-all-dishes", dishController.handleGetAllDishes);
  router.post("/api/create-new-dish", (req, res) =>
    dishController.handleCreateNewDish(req, res, io)
  );
  router.post("/api/edit-dish", (req, res) =>
    dishController.handleEditDish(req, res, io)
  );
  router.post("/api/delete-dish", (req, res) =>
    dishController.handleDeleteDish(req, res, io)
  );
  router.get(
    "/api/get-detail-dish-by-id",
    dishController.handleGetDetailDishById
  );
  router.get("/api/get-all-dish-names", dishController.handleGetAllDishNames);
  router.get(
    "/api/get-all-dishRestaurant-names",
    dishController.handleGetAllDishRestaurantNames
  );

  router.get("/api/get-all-combos", comboController.handleGetAllCombos);
  router.post("/api/create-new-combo", comboController.handleCreateCombo);
  router.delete("/api/delete-combo", comboController.handleDeleteCombo);
  router.put("/api/edit-combo", comboController.handleEditCombo);

  router.post(
    "/api/get-all-categories",
    categoryController.handleGetAllCategories
  );
  router.post(
    "/api/create-new-category",
    categoryController.handleCreateNewCategory
  );
  router.post("/api/edit-category", (req, res) =>
    categoryController.handleEditCategory(req, res, io)
  );
  router.post("/api/delete-category", (req, res) =>
    categoryController.handleDeleteCategory(req, res, io)
  );

  router.get(
    "/api/get-list-customer-for-staff",
    staffController.handleGetListCustomerForStaff
  );

  router.get(
    "/api/get-restaurant-by-staffId",
    staffController.handleGetRestaurantByStaffId
  );

  router.post("/api/update-table", (req, res) =>
    staffController.handleUpdateTable(req, res, io)
  );

  router.get("/api/get-all-orders", orderController.handleGetAllOrders);
  router.put("/api/edit-order", orderController.editHandler);
  router.delete("api/delete-order", orderController.cancelHandler);
  router.post("/api/choose-table", orderController.chooseTableHandler);
  router.post("/api/free-table", (req, res) =>
    tableController.freeTableHandler(req, res, io)
  );
  router.post("/api/search-table", tableController.handleSearchTable);

  router.post(
    "/api/update-status-order",
    orderController.handleUpdateStatusOrder
  );

  router.post(
    "/api/get-all-orders-of-customer",
    orderController.handleGetAllOrderByCustomerPhoneNumber
  );

  router.post(
    "/api/update-status-order",
    orderController.handleUpdateStatusOrder
  );

  router.post(
    "/api/get-all-orders-by-restaurantId",
    orderController.handleGetAllOrdersByRestaurantId
  );

  router.post(
    "/api/get-detail-order-by-orderId",
    orderController.handleGetDetailOrderByOrderId
  );

  router.post("/api/update-order", (req, res) =>
    orderController.handleUpdateOrder(req, res, io)
  );
  router.post("/api/update-order-item", orderController.handleUpdateOrderItem);

  router.post("/api/checkout-order", (req, res) =>
    orderController.handleCheckoutOrder(req, res, io)
  );

  router.post("/api/create-invoice", (req, res) =>
    invoiceController.handleCreateInvoice(req, res, io)
  );

  router.post(
    "/api/get-available-tables",
    tableController.handleGetAvailableTables
  );
  router.post(
    "/api/get-all-tables-by-restaurantId",
    tableController.handleGetAllTableByRestaurantId
  );
  router.post("/api/create-order-by-staff", staffController.createOrder);
  router.post("/api/create-payment", paymentController.handlePaymentWithVNP);
  router.get("/api/vnpay_return", (req, res) =>
    paymentController.handlePaymentResultWithVNP(req, res, io)
  );

  router.post("/api/get-all-staff", adminController.handleGetAllStaff);
  router.post("/api/change-password", userController.handleChangePassword);
  router.post(
    "/api/get-all-order-by-customerId",
    orderController.handleGetAllOrderByCustomerId
  );
  return app.use("/", router);
};

module.exports = initWebRoutes;
