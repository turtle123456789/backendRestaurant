import restaurantService from "../services/restaurantService";

// let handleGetAllRestaurants = async (req, res) => {
//   let id = req.query.id;

//   if (!id) {
//     return res.status(400).json({
//       status: 400,
//       message: "Missing required parameter",
//       data: "",
//     });
//   }
//   let data = await restaurantService.getAllRestaurants(id);
//   return res.status(200).json({
//     status: 200,
//     message: "OK",
//     data: data.data,
//   });
// };

let handleGetAllRestaurants = async (req, res) => {
  try {
    let data = await restaurantService.getAllRestaurants();
    return res.json({
      status: 200,
      message: "OK",
      data: data.data,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 500,
      message: "Error from server...",
      data: "",
    });
  }
};

// let handleGetAllTypeNames = async (req, res) => {
//   try {
//     let typeNames = await restaurantService.getAllTypeNames();
//     return res.status(200).json(typeNames);
//   } catch (e) {
//     console.log(e);
//     return res.status(200).json({
//       errCode: -1,
//       errMessage: "Error from server",
//     });
//   }
// };

let handleCreateNewRestaurant = async (req, res, io) => {
  let data = await restaurantService.createNewRestaurant(req.body);
  if (data.status === 200) {
    io.sockets.emit("update-restaurant-data", "success");
  }
  return res.json(data);
};

let handleDeleteRestaurant = async (req, res, io) => {
  if (!req.body.id) {
    return res.json({
      status: 400,
      message: "Missing required parameter",
      data: "",
    });
  }
  let data = await restaurantService.deleteRestaurant(req.body.id);
  if (data.status === 200) {
    io.sockets.emit("update-restaurant-data", "success");
  }
  return res.json(data);
};

let handleEditRestaurant = async (req, res, io) => {
  let data = await restaurantService.updateRestaurantData(req.body);
  if (data.status === 200) {
    io.sockets.emit("update-restaurant-data", "success");
  }
  return res.json(data);
};

// let getAllCode = async (req, res) => {
//   try {
//     let data = await restaurantService.getAllCodeService(req.query.type);
//     console.log(data);
//     return res.status(200).json(data);
//   } catch (e) {
//     console.log("Get all code error:", e);
//     return res.status(200).json({
//       errCode: -1,
//       errMessage: "Error from server",
//     });
//   }
// };

// let handleGetTopRestaurant = async (req, res) => {
//   let limit = req.query.limit;
//   if (!limit) limit = 5;
//   try {
//     let restaurants = await restaurantService.getTopRestaurant(+limit);
//     return res.status(200).json(restaurants);
//   } catch (e) {
//     console.log(e);
//     return res.status(200).json({
//       errCode: -1,
//       message: "Error from server...",
//     });
//   }
// };

let handleGetDetailRestaurantById = async (req, res) => {
  try {
    let data = await restaurantService.getDetailRestaurantById(req.query.id);
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

// let handleBulkCreateSchedule = async (req, res) => {
//   try {
//     console.log(req.body);
//     let info = await restaurantService.bulkCreateSchedule(req.body);
//     return res.status(200).json(info);
//   } catch (e) {
//     console.log(e);
//     return res.status(200).json({
//       errCode: -1,
//       errMessage: "Error from server...",
//     });
//   }
// };

// let handleGetScheduleByDate = async (req, res) => {
//   try {
//     console.log(req.body);
//     let info = await restaurantService.getScheduleByDate(
//       req.query.restaurantId,
//       req.query.date
//     );
//     return res.status(200).json(info);
//   } catch (e) {
//     console.log(e);
//     return res.status(200).json({
//       errCode: -1,
//       errMessage: "Error from server...",
//     });
//   }
// };

// let handleGetExtraInfoRestaurantById = async (req, res) => {
//   try {
//     let info = await restaurantService.getExtraInfoRestaurantById(req.query.id);
//     return res.status(200).json(info);
//   } catch (e) {
//     console.log(e);
//     return res.status(200).json({
//       errCode: -1,
//       errMessage: "Error from server...",
//     });
//   }
// };

// let handleGetProfileRestaurantById = async (req, res) => {
//   try {
//     let info = await restaurantService.getProfileRestaurantById(req.query.id);
//     return res.status(200).json(info);
//   } catch (e) {
//     console.log(e);
//     return res.status(200).json({
//       errCode: -1,
//       errMessage: "Error from server...",
//     });
//   }
// };

// let handlePostInfoRestaurant = async (req, res) => {
//   try {
//     let response = await restaurantService.saveDetailInfoRestaurant(req.body);
//     return res.status(200).json(response);
//   } catch (e) {
//     console.log(e);
//     return res.status(200).json({
//       errCode: -1,
//       errMessage: "Error from server...",
//     });
//   }
// };

let handleGetRestaurantByLocation = async (req, res) => {
  try {
    let data = await restaurantService.getRestaurantByLocation(
      req.query.location
    );

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

module.exports = {
  handleGetAllRestaurants: handleGetAllRestaurants,
  handleCreateNewRestaurant: handleCreateNewRestaurant,
  handleEditRestaurant: handleEditRestaurant,
  handleDeleteRestaurant: handleDeleteRestaurant,
  handleGetDetailRestaurantById: handleGetDetailRestaurantById,
  handleGetRestaurantByLocation: handleGetRestaurantByLocation,
};
