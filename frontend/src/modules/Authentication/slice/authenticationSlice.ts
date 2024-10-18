import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TAuthState } from "./types/TAuthState";
import { IUserEntity } from "../../../common/Entities/IUserEntity";
import { loadAuth, saveAuth } from "../../../utils/auth";

const initialState: TAuthState = loadAuth() ?? {
  user: null,
};

const authenticationSlice = createSlice({
  name: "authenticationSlice",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserEntity>) => {
      state.user = action.payload;
      saveAuth(state);
    },
  },
});

export const authenticationReducer = authenticationSlice.reducer;
export const authenticationActions = authenticationSlice.actions;
