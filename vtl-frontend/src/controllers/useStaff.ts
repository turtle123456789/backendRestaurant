import * as tableService from "@/services/table";
import  restaurantService from "@/services/restaurant";
import * as orderService from "@/services/order";
import * as dishService from "@/services/dish";
import * as invoiceService from "@/services/invoice";

const useStaff = () => {
  const createTable = async (body: any) => {
    return await tableService.createNewTable(body);
  };

  const editTableById = async (body: any) => {
    return await tableService.editTable(body);
  };

  const deleteTableById = async (body: any) => {
    return await tableService.deleteTable(body);
  };

  const getAllTable = async () => {
    return await tableService.getAllTables();
  };

  const getDetailTableById = async (body: any) => {
    return await tableService.getDetailTable(body);
  };

  const freeTable = async (body: any) => {

    return await tableService.freeTable(body);
  };

  const editRestaurantById = async (body: any) => {
    return await restaurantService.editRestaurant(body);
  };

  const getDetailRestaurantById = async (body: any) => {
    return await restaurantService.getDetailRestaurantById(body);
  };
  const getOrderDetail = async (body: any) => {
    return await orderService.getOrderDetail(body);
  };

  const getAllTablesByRestaurantId = async (body: any) => {
    return await tableService.getAllTablesByRestaurantId(body);
  };
  const getAllDishes = async () => {
    return await dishService.getAllDishes();
  };

  const getAvailableTable = async (body: any) => {
    return await tableService.getAvailableTables(body);
  };

  const createNewOrder = async (body: any) => {
    return await orderService.createNewOrderByStaff(body);
  }

  const getAllOrdersByRestaurantId = async (body: any) => {
    return await orderService.getAllOrdersByRestaurantId(body);
  }

  const updateOrder = async (body : any) => {
    return await orderService.updateOrder(body);
  }

  const handleUpdateTable = async (body: any) => {
    return await tableService.updateTable(body);
  }

  const createInvoice = async (body: any) => {
        
    console.log("HELLLO")
    return await invoiceService.createNewInvoice(body);
  }

  return {
    createTable,
    editTableById,
    deleteTableById,
    getAllTable,
    getDetailTableById,
    editRestaurantById,
    getDetailRestaurantById,
    getOrderDetail,
    getAllTablesByRestaurantId,
    getAllDishes,
    getAvailableTable,
    createNewOrder,
    getAllOrdersByRestaurantId,
    updateOrder,
    handleUpdateTable,
    createInvoice,
    freeTable
  };
};

export default useStaff;
