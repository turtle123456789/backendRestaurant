import typeService from "../services/typeService";
let handleCreateType = async (req, res) => {
  try {
    let info = await typeService.createType(req.body);
    console.log(info);
    return res.status(200).json(info);
  } catch (e) {
    console.log("Get all code error:", e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let handleGetAllTypes = async (req, res) => {
  try {
    let info = await typeService.getAllTypes();

    return res.status(200).json(info);
  } catch (e) {
    console.log("Get all code error:", e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let handleGetDetailTypeById = async (req, res) => {
  try {
    let info = await typeService.getDetailTypeById(
      req.query.id,
      req.query.location
    );

    return res.status(200).json(info);
  } catch (e) {
    console.log("Get all code error:", e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

module.exports = {
  handleCreateType: handleCreateType,
  handleGetAllTypes: handleGetAllTypes,
  handleGetDetailTypeById: handleGetDetailTypeById,
};
