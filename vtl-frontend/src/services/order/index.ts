import {client} from '../client';

export const createNewOrder = async (body : any) => {
    try {
        const response = await client.post("/book-table", body);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getOrdersByCustomerPhoneNumber = async (body : any) => {
    try {
        const response = await client.post('/get-all-orders-of-customer', body);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getOrdersByCustomerId = async (body : any) => {
    try {
        const response = await client.post('/get-all-order-by-customerId', body);
        return response;
    } catch (error) {
        console.log(error);
    }

}

export const getOrderDetail = async (body : any) => {
    try {
        const response = await client.post('/get-detail-order-by-orderId', body);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getAllOrdersByRestaurantId = async (body : any) => {
    try {
        const response = await client.post('/get-all-orders-by-restaurantId', body);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const createNewOrderByStaff = async (body : any) => {
    try {
        const response = await client.post('/create-order-by-staff', body);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const payDeposit = async (body : any) => {
    try {
        const response = await client.post('/create-payment', body);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const updateOrder = async (body : any) => {
    try {
        const response = await client.post('/update-order', body);
        return response;
    } catch (error) {
        console.log(error);
    }
}