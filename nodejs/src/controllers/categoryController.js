import categoryService from "../services/categoryService";
let handleGetAllCategories = async (req, res) => {
  let data = await categoryService.getAllCategories();
  return res.json({
    status: 200,
    message: "OK",
    data: data.data,
  });
};

let handleCreateNewCategory = async (req, res) => {
  let data = await categoryService.createNewCategory(req.body);
  return res.json(data);
};

let handleDeleteCategory = async (req, res, io) => {
  if (!req.body.id) {
    return res.json({
      status: 400,
      message: "Missing required parameter",
      data: "",
    });
  }
  let data = await categoryService.deleteCategory(req.body.id);
  if(data.status === 200){
    io.sockets.emit("update-data", "success");
  }
  return res.json(data);
};

let handleEditCategory = async (req, res, io) => {
  let data = await categoryService.updateCategoryData(req.body);
  if(data.status === 200){
    io.sockets.emit("update-data", "success");
  }
  return res.json(data);
};
module.exports = {
  handleGetAllCategories,
  handleCreateNewCategory,
  handleDeleteCategory,
  handleEditCategory,
};
