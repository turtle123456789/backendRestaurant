import * as tableService from "@/services/table";
import restaurantService from "@/services/restaurant";
import * as dishService from "@/services/dish";
import * as orderService from "@/services/order";
import * as categoryService from "@/services/category";

const useCustomer = () => {
  const getAllTable = async () => {
    return await tableService.getAllTables();
  };

  const getDetailTableById = async (body: any) => {
    return await tableService.getDetailTable(body);
  };

  const getRestaurantByLocation = async (body: any) => {
    return await restaurantService.getRestaurantByLocation(body);
  };

  const getAllRestaurants = async () => {
    return await restaurantService.getAllRestaurants();
  };

  const getDetailRestaurantById = async (body: any) => {
    return await restaurantService.getDetailRestaurantById(body);
  };

  const getAllDishes = async () => {
    return await dishService.getAllDishes();
  };

  const getDetailDishById = async (body: any) => {
    return await dishService.getDetailDish(body);
  };

  const getTableAvailable = async (body: any) => {
    return await tableService.getTableAvailable(body);
  };

  const bookTable = async (body: any) => {
    return await orderService.createNewOrder(body);
  };

  const getOrdersByCustomerPhoneNumber = async (body: any) => {
    return await orderService.getOrdersByCustomerPhoneNumber(body);
  };

  const getOrderDetail = async (body: any) => {
    return await orderService.getOrderDetail(body);
  };

  const payDeposit = async (body: any) => {
    return await orderService.payDeposit(body);
  };

  const updateOrder = async (body: any) => {
    return await orderService.updateOrder(body);
  };

  const getOrdersByCustomerId = async (body: any) => {
    return await orderService.getOrdersByCustomerId(body);
  };
  const getAllCategories = async () => {
    return await categoryService.getAllCategories();
  };
  return {
    getAllTable,
    getDetailTableById,
    getRestaurantByLocation,
    getAllRestaurants,
    getDetailRestaurantById,
    getAllDishes,
    getDetailDishById,
    getTableAvailable,
    bookTable,
    getOrdersByCustomerPhoneNumber,
    getOrderDetail,
    payDeposit,
    updateOrder,
    getOrdersByCustomerId,
    getAllCategories,
  };
};

export default useCustomer;
