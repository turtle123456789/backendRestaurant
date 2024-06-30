import { configureStore } from "@reduxjs/toolkit";
import profileSlice from "./profile/profileSlice";
import cartSlice from "./cart/cartSlice";
export const store = configureStore({
  reducer: {
    profile: profileSlice,
    cart: cartSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
