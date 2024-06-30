const updateService = require("../services/updateService");

const updateOrderStatus = async () => {
  try {
    await updateService.updateOrderStatus();
  } catch (e) {
    console.log(e);
  }
};

const updateTable = async () => {
  try {
    await updateService.updateTable();
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  updateOrderStatus,
  updateTable,
};
