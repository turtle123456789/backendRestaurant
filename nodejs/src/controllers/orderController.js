const orderService = require("../services/orderService");
const orderDAO = require("../DAOs/orderDAO");
const tableDAO = require("../DAOs/tableDao");

const handleGetAllOrders = async (req, res) => {
  const orders = await orderService.getAllOrders(orderDAO);
  return res.status(200).json({
    success: true,
    collection: orders,
  });
};

const registerHandler = async (req, res) => {
  const payload = req.body;
  await orderService.registerOrder(orderDAO, payload);

  return res.status(201).json({
    success: true,
    message: "Successfully registered the order!",
  });
};

const editHandler = async (req, res) => {
  const payload = req.body;
  const orderId = req.params.orderId;
  const order = await orderService.editOrder(orderId, orderDAO, payload);

  return res.status(200).json({
    success: true,
    message: "Successfully updated the order!",
    item: order,
  });
};

const cancelHandler = async (req, res) => {
  const orderId = req.params.orderId;
  const order = await orderService.cancelOrder(orderId, orderDAO);

  return res.status(200).json({
    success: true,
    message: "Successfully canceled the order!",
    item: order,
  });
};

const chooseTableHandler = async (req, res) => {
  const orderId = req.params.orderId;
  const { tableId } = req.body;

  const info = await orderService.chooseTable(
    orderId,
    tableId,
    orderDAO,
    tableDAO
  );

  return res.status(200).json({
    success: true,
    message: "Successfully chosen your table!",
    item: info,
  });
};
const handleGetAllOrdersByRestaurantId = async (req, res) => {
  try {
    let data = await orderService.getAllOrdersByRestaurantId(req.body);
    return res.json(data);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 500,
      message: "Error from server...",
      data: "",
    });
  }
};

const handleUpdateStatusOrder = async (req, res) => {
  try {
    let data = await orderService.updateStatusOrder(req.body);
    return res.status(data.status).json(data);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 500,
      message: "Error from server...",
      data: "",
    });
  }
};
let handleGetDetailOrderByOrderId = async (req, res) => {
  try {
    let data = await orderService.getDetailOrderByOrderId(req.body);
    return res.json(data);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 500,
      message: "Error from server...",
    });
  }
};

const handleGetAllOrderByCustomerPhoneNumber = async (req, res) => {
  try {
    let data = await orderService.getAllOrdersByCustomerPhoneNumber(req.body);

    return res.status(data.status).json(data);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 500,
      message: "Error from server...",
    });
  }
};

const handleGetAllOrderByCustomerId = async (req, res) => {
  try {
    let data = await orderService.getAllOrdersByCustomerId(req.body);

    return res.status(data.status).json(data);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 500,
      message: "Error from server...",
    });
  }
};

const handleUpdateOrder = async (req, res, io) => {
  try {
    let data = await orderService.newUpdateOrder(req.body);
    if (data.status === 200) io.emit("update-order", "success");
    else io.emit("update-order", "fail");
    return res.status(data.status).json(data);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 500,
      message: "Error from server...",
    });
  }
};

const handleUpdateOrderItem = async (req, res) => {
  try {
    let data = await orderService.updateOrderItem(req.body);
    return res.status(data.status).json(data);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 500,
      message: "Error from server...",
    });
  }
};

const handleCheckoutOrder = async (req, res, io) => {
  try {
    let data = await orderService.checkoutOrder(req.body);
    if (data.status === 200) io.emit("checkout-order", "success");
    else io.emit("checkout-order", "fail");
    return res.status(data.status).json(data);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 500,
      message: "Error from server...",
    });
  }
};

module.exports = {
  handleGetAllOrders,
  registerHandler,
  editHandler,
  cancelHandler,
  chooseTableHandler,
  handleGetAllOrdersByRestaurantId,
  handleUpdateStatusOrder,
  handleGetAllOrderByCustomerPhoneNumber,
  handleGetDetailOrderByOrderId,
  handleUpdateOrder,
  handleUpdateOrderItem,
  handleGetAllOrderByCustomerId,
  handleCheckoutOrder,
};
