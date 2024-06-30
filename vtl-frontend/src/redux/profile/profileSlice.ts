import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Profile = {
  email: string;
  fullName: string;
  phoneNumber: string;
  id: number;
  roleId: number;
  restaurantId?: number;
  image: string;
};

const initialState: Profile = {
  email: "",
  fullName: "",
  phoneNumber: "",
  id: -1,
  roleId: -1,
  restaurantId: undefined,
  image: "",
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<Profile>) => {
      state.email = action.payload.email;
      state.fullName = action.payload.fullName;
      state.phoneNumber = action.payload.phoneNumber;
      state.id = action.payload.id;
      state.roleId = action.payload.roleId;
      state.restaurantId = action.payload.restaurantId;
      state.image = action.payload.image ?? "";
    },
    clearProfile: (state) => {
      state.email = "";
      state.fullName = "";
      state.phoneNumber = "";
      state.id = -1;
      state.roleId = -1;
      state.restaurantId = undefined;
      state.image = "";
    },
  },
});

export const { setProfile, clearProfile } = profileSlice.actions;

export default profileSlice.reducer;
