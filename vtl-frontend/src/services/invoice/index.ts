import {client} from '../client';

export const createNewInvoice = async (body : any) => {
    try {
        const response = await client.post("/create-invoice", body);
        return response;
    } catch (error) {
        console.log(error);
    }
}