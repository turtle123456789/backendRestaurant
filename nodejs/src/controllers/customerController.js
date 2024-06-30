import customerService from "../services/customerService";

// let handleChooseTable = async (req, res) => {
//   try {
//     let data = await customerService.chooseTable(req.body);
//     return res.status(data.status).json(data);
//   } catch (e) {
//     console.log(e);
//     return res.status(500).json({
//       status: 500,
//       message: "Error from server...",
//       data: "",
//     });
//   }
// };

let handleBookTable = async (req, res, io) => {
  try {
    let data = await customerService.bookTable(req.body);
    if(data.status === 201) io.emit("update-order-list", data.data);
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

let handleCreateNewOrderItem = async (req, res) => {
  try {
    let data = await customerService.createNewOrderItem(req.body);
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

let handleCustomerPreOrderDish = async (req, res) => {
  try {
    let info = await customerService.customerPreOrderDish(req.body);
    console.log("typeof info:", typeof info);
    return res.status(200).json(info);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server...",
    });
  }
};

module.exports = {
  // handleChooseTable,
  handleBookTable,
  handleCustomerPreOrderDish,
  handleCreateNewOrderItem,
};
