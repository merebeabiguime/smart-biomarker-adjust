import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AsthmaAttackSeverity,
  TReceivedDataState,
} from "./types/TReceivedDataState";

const initialState: TReceivedDataState = {
  oxygenPercentage: 0,
  breathingFrequency: 0,
  healthStatus: AsthmaAttackSeverity.MILD,
};

const receivedDataSlice = createSlice({
  name: "fundsManagement",
  initialState,
  reducers: {
    setOxygenPercentage: (state, action: PayloadAction<number>) => {
      state.oxygenPercentage = action.payload;
    },
    setBreathingFrequency: (state, action: PayloadAction<number>) => {
      state.breathingFrequency = action.payload;
    },
    setHealthStatus: (state, action: PayloadAction<AsthmaAttackSeverity>) => {
      state.healthStatus = action.payload;
    },
  },
});

export const receivedDataReducer = receivedDataSlice.reducer;
export const receivedDataActions = receivedDataSlice.actions;
