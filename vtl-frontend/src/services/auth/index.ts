import {testClient} from "../client";

export const loginWithEmail = async (body : any) => {
    try {
        const response = await testClient.post("/login", body);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const registerWithEmail = async (body : any) => {
    try {
        const response = await testClient.post("/register", body);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const updateInfo = async (body : any) => {
    try {
        const response = await testClient.post("/edit-user", body);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const changePass = async (body : any) => {
    try {
        const response = await testClient.post("/change-password", body);
        return response;
    } catch (error) {
        console.log(error);
    }
}