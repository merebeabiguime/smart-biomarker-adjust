import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TAuthState } from "./types/TAuthState";
import { IUserEntity } from "../../../common/Entities/IUserEntity";

const initialState: TAuthState = {
  user: null,
};

const authenticationSlice = createSlice({
  name: "authenticationSlice",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserEntity>) => {
      state.user = action.payload;
    },
  },
});

export const authenticationReducer = authenticationSlice.reducer;
export const authenticationActions = authenticationSlice.actions;
