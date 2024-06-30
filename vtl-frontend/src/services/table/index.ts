import {client} from "../client";

export const createNewTable = async (body : any) => {
    try {
        const response = await client.post("/create-new-table", body);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const editTable = async (body : any) => {
    try {
        const response = await client.put("/edit-table", body);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const deleteTable = async (body : any) => {
    try {
        const response = await client.post("/delete-table", body);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getAllTables = async () => {
    try {
        const response = await client.get("/get-all-tables");
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getDetailTable = async (body : any) => {

    try {
        const response = await client.get("/get-detail-table-by-id", body);
        return response;
    } catch (error) {
        console.log(error);
    }

}

export const getTableAvailable = async (body: any) => {
    try {
        const response = await client.post("/search-table",  body);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getAllTablesByRestaurantId = async (body : any) => {
    try {
        const response = await client.post("/get-all-tables-by-restaurantId", body);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const freeTable = async (body : any) => {
    try {
        const response = await client.post("/free-table", body);
        return response;
    } catch (error) {
        console.log(error);
    }
}


export const getAvailableTables = async (body : any) => {
    try {
        const response = await client.post("/get-available-tables", body);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const updateTable = async (body : any) => {
    try {
        const response = await client.post("/update-table", body);
        return response;
    } catch (error) {
        console.log(error);
    }
}