import dishService from "../services/dishService";
let handleGetAllDishes = async (req, res) => {
  let data = await dishService.getAllDishes();
  return res.status(200).json({
    status: 200,
    message: "OK",
    data: data.data,
  });
};

let handleGetAllDishNames = async (req, res) => {
  try {
    let dishNames = await dishService.getAllDishNames();
    return res.status(200).json(dishNames);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      status: -1,
      message: "Error from server",
    });
  }
};

let handleGetAllDishRestaurantNames = async (req, res) => {
  try {
    let dishRestaurantNames = await dishService.getAllDishRestaurantNames();
    return res.status(200).json(dishRestaurantNames);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      status: -1,
      message: "Error from server",
    });
  }
};

let handleCreateNewDish = async (req, res, io) => {
  let data = await dishService.createNewDish(req.body);
  if(data.status === 201) io.emit("update-dish-list", "success");
  return res.json(data);
};

let handleGetDetailDishById = async (req, res) => {
  try {
    let data = await dishService.getDetailDishById(req.query.id);
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

let handleDeleteDish = async (req, res, io) => {
  if (!req.body.id) {
    return res.status(400).json({
      status: 400,
      message: "Missing required parameter",
      data: "",
    });
  }
  let data = await dishService.deleteDish(req.body.id);
  if(data.status === 200) io.emit("update-dish-list", "success");
  return res.json(data);
};

let handleEditDish = async (req, res, io) => {
  let data = await dishService.updateDishData(req.body);
  if(data.status === 200) io.emit("update-dish-list", "success");
  return res.json(data);
};
module.exports = {
  handleGetAllDishes,
  handleGetAllDishNames,
  handleGetAllDishRestaurantNames,
  handleCreateNewDish,
  handleGetDetailDishById,
  handleDeleteDish,
  handleEditDish,
};
