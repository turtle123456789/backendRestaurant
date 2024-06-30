import db from "../models/index";
import user from "../models/user";
import CRUDService from "../services/CRUDService";

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("homepage.ejs", {
      data: JSON.stringify(data), //chuyển data thành 1 chuỗi string
    });
  } catch (e) {
    console.log(e);
  }
};

let getAboutPage = (req, res) => {
  return res.render("test/about.ejs");
};

let getCRUD = (req, res) => {
  return res.render("crud.ejs");
};

let postCRUD = async (req, res) => {
  let message = await CRUDService.createNewRestaurant(req.body);
  console.log(message);
  return res.send("post crud from server");
};

let displayGetCRUD = async (req, res) => {
  let data = await CRUDService.getAllRestaurant();
  console.log("-------------------------------------");
  console.log(data);
  console.log("-------------------------------------");

  return res.render("displayCRUD.ejs", {
    dataTable: data,
  });
};

let getEditCRUD = async (req, res) => {
  let restaurantId = req.query.id;
  if (restaurantId) {
    let restaurantData = await CRUDService.getRestaurantInfoById(restaurantId);

    return res.render("editCRUD.ejs", {
      restaurant: restaurantData,
    });
  } else {
    return res.send("restaurant not found");
  }
};

let putCRUD = async (req, res) => {
  let data = req.body;
  let allRestaurants = await CRUDService.updateRestaurantData(data);

  return res.render("displayCRUD.ejs", {
    dataTable: allRestaurants,
  });
};

let deleteCRUD = async (req, res) => {
  let id = req.query.id;
  if (id) {
    await CRUDService.deleteRestaurantById(id);
    return res.send("delete restaurant succeed");
  } else {
    return res.send("restaurant not found");
  }
};

module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  displayGetCRUD: displayGetCRUD,
  getEditCRUD: getEditCRUD,
  putCRUD: putCRUD,
  deleteCRUD: deleteCRUD,
};
