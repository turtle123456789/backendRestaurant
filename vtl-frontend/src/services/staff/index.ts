import { client } from "../client";

export const createNewStaff = async (body : any) => {
    try {
        const response = await client.post("/create-new-staff", body);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const editStaff = async (body : any) => {
    try {
        const response = await client.post("/edit-user", body);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const deleteStaff = async (body : any) => {
    try {
        const response = await client.post("/delete-user", body);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getAllStaff = async () => {
    try {
        const response = await client.post("/get-all-staff", {});
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getDetailStaff = async (body : any) => {
    try {
        const response = await client.get("/get-detail-user-by-id", {params: body});
        return response;
    } catch (error) {
        console.log(error);
    }
}

