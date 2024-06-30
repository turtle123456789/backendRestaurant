import {client} from '../client';

export const createNewCategory = async (body : any) => {
    try {
        const response = await client.post('/create-new-category', body);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getAllCategories = async () => {
    try {
        const response = await client.post('/get-all-categories', {});
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const updateCategory = async (body : any) => {
    try {
        const response = await client.post('/edit-category', body);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const deleteCategory = async (body : any) => {
    try {
        const response = await client.post('/delete-category', body);
        return response;
    } catch (error) {
        console.log(error);
    }
}