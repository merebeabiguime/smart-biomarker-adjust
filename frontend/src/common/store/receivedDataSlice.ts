import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TReceivedDataState } from "./types/TReceivedDataState";

const initialState: TReceivedDataState = {
  oxygenPercentage: null,
};

const receivedDataSlice = createSlice({
  name: "fundsManagement",
  initialState,
  reducers: {
    setOxygenPercentage: (state, action: PayloadAction<number>) => {
      state.oxygenPercentage = action.payload;
    },
  },
});

export const receivedDataReducer = receivedDataSlice.reducer;
export const receivedDataActions = receivedDataSlice.actions;
