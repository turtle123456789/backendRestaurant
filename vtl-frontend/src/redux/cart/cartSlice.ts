import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type OrderItem = {
  dishId: number;
  dishName: string;
  total: number;
  quantity: number;
};

type Dish = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: number;
  isSelect: boolean;
};

type Table = {
  id: number;
  name: string;
  capacity: number;
  position: string;
  description: string;
};

type Order = {
  order: {
    id: number;
    resDate: string;
    resTime: string;
    people: number;
    resStatus: string;
    depositAmount: number;
    restaurantId: number;
    fullName: string;
    phoneNumber: string;
    totalAmount: number;
    createdAt: string;
    updatedAt: string;
    paymentStatus: string;
    cusId? : number;
    email: string;
  };
  orderItems: OrderItem[];
  tables: Table[];
};

const initialState: Order = {
  order: {
    id: -1,
    resDate: "",
    resTime: "",
    people: 0,
    resStatus: "",
    depositAmount: 0,
    restaurantId: -1,
    fullName: "",
    phoneNumber: "",
    totalAmount: 0,
    createdAt: "",
    updatedAt: "",
    paymentStatus: "",
    email: "",
    cusId: -1,
  },
  orderItems: [],
  tables: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        setOrder: (state, action: PayloadAction<Order>) => {
        state.order = action.payload.order;
        state.orderItems = action.payload.orderItems;
        state.tables = action.payload.tables;
        },
        clearOrder: (state) => {
        state.order = initialState.order;
        state.orderItems = initialState.orderItems;
        state.tables = initialState.tables;
        },
    },
});

export const { setOrder, clearOrder } = cartSlice.actions;

export default cartSlice.reducer;