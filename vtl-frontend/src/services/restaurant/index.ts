import { client } from "../client";


const createNewRestaurant = async (body: any) => {
  try {
    const response = await client.post("/create-new-restaurant", body);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const editRestaurant = async (body: any) => {
  try {
    const response = await client.post("/edit-restaurant", body);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const deleteRestaurant = async (body: any) => {
  try {
    const response = await client.post("/delete-restaurant", body );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getAllRestaurants = async () => {
  try {
    const response = await client.get("/get-all-restaurants");
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getDetailRestaurantById = async (body: any) => {
  try {
    const response = await client.get(
      `/get-detail-restaurant-by-id?id=${body.id}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getRestaurantByLocation = async (body: any) => {
  try {
    const response = await client.get("/get-restaurant-by-location", {
      params: body,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const restaurantService = {
  createNewRestaurant,
  editRestaurant,
  deleteRestaurant,
  getAllRestaurants,
  getDetailRestaurantById,
  getRestaurantByLocation,
};

export default restaurantService;