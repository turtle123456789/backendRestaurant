// controllers/comboController.js

const comboService = require("../services/comboService");

let handleGetAllCombos = async (req, res) => {
  let data = await comboService.getAllCombos();
  return res.status(200).json({
    status: 200,
    message: "OK",
    data: data.data,
  });
};

const handleCreateCombo = async (req, res) => {
  try {
    const comboData = req.body;

    // Gọi service để tạo combo từ dữ liệu đầu vào
    const result = await comboService.createCombo(comboData);

    // Trả về kết quả cho client
    res.status(result.status).json(result);
  } catch (error) {
    console.error("Error creating combo:", error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};

const handleDeleteCombo = async (req, res) => {
  try {
    const comboId = req.body.id; // Lấy comboId từ request parameter

    // Gọi service để xóa combo dựa trên comboId
    const result = await comboService.deleteCombo(comboId);

    // Trả về kết quả cho client
    res.status(result.status).json(result);
  } catch (error) {
    console.error("Error deleting combo:", error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
};

let handleEditCombo = async (req, res) => {
  let data = await comboService.updateComboData(req.body);
  return res.status(data.status).json(data);
};

module.exports = {
  handleCreateCombo,
  handleDeleteCombo,
  handleGetAllCombos,
  handleEditCombo,
};
