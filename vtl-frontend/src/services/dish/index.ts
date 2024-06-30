import { client } from "../client";

export const createNewDish = async (body : any) => {
    try {
        const response = await client.post("/create-new-dish", body);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const editDish = async (body : any) => {
    try {
        const response = await client.post("/edit-dish", body);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const deleteDish = async (body : any) => {
    try {
        const response = await client.post("/delete-dish", body);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getAllDishes = async () => {
    try {
        const response = await client.get("/get-all-dishes");
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getDetailDish = async (body : any) => {
    try {
        const response = await client.get("/get-detail-dish-by-id", body);
        return response;
    } catch (error) {
        console.log(error);
    }
}