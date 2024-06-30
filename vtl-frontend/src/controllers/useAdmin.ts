import * as staffService from "@/services/staff";
import * as tableService from "@/services/table";
import * as dishService from "@/services/dish";
import restaurantService from "@/services/restaurant";
import * as categoryService from "@/services/category";
const useAdmin = () => {
  const createStaff = async (body: any) => {
    return await staffService.createNewStaff(body);
  };

  const createTable = async (body: any) => {
    return await tableService.createNewTable(body);
  };

  const editTableById = async (body: any) => {
    return await tableService.editTable(body);
  };

  const editDishById = async (body: any) => {
    return await dishService.editDish(body);
  };

  const createDish = async (body: any) => {
    return await dishService.createNewDish(body);
  };

  const deleteDishById = async (body: any) => {
    return await dishService.deleteDish(body);
  };

  const deleteTableById = async (body: any) => {
    return await tableService.deleteTable(body);
  };

  const getAllDish = async () => {
    return await dishService.getAllDishes();
  };

  const getAllTable = async () => {
    return await tableService.getAllTables();
  };

  const getDetailDishById = async (body: any) => {
    return await dishService.getDetailDish(body);
  };

  const getDetailTableById = async (body: any) => {
    return await tableService.getDetailTable(body);
  };

  const editStaffById = async (body: any) => {
    return await staffService.editStaff(body);
  };

  const deleteStaffById = async (body: any) => {
    return await staffService.deleteStaff(body);
  };

  const getAllStaff = async () => {
    return await staffService.getAllStaff();
  };

  const getDetailStaffById = async (body: any) => {
    return await staffService.getDetailStaff(body);
  };

  const createNewRestaurant = async (body: any) => {
    return await restaurantService.createNewRestaurant(body);
  };

  const editRestaurant = async (body: any) => {
    return await restaurantService.editRestaurant(body);
  };

  const deleteRestaurant = async (body: any) => {
    return await restaurantService.deleteRestaurant(body);
  };

  const getAllRestaurants = async () => {
    return await restaurantService.getAllRestaurants();
  };

  const getDetailRestaurantById = async (body: any) => {
    return await restaurantService.getDetailRestaurantById(body);
  };

  const getRestaurantByLocation = async (body: any) => {
    return await restaurantService.getRestaurantByLocation(body);
  };

  const createNewCategory = async (body: any) => {
    return await categoryService.createNewCategory(body);
  }

  const getAllCategories = async () => {
    return await categoryService.getAllCategories();
  }

  const updateCategory = async (body: any) => {
    return await categoryService.updateCategory(body);
  }

  const deleteCategory = async (body: any) => {
    return await categoryService.deleteCategory(body);
  }

  return {
    createStaff,
    createTable,
    editTableById,
    editDishById,
    createDish,
    deleteDishById,
    deleteTableById,
    getAllDish,
    getAllTable,
    getDetailDishById,
    getDetailTableById,
    editStaffById,
    deleteStaffById,
    getAllStaff,
    getDetailStaffById,
    createNewRestaurant,
    editRestaurant,
    deleteRestaurant,
    getAllRestaurants,
    getDetailRestaurantById,
    getRestaurantByLocation,
    createNewCategory,
    getAllCategories,
    updateCategory,
    deleteCategory
  };
};

export default useAdmin;
