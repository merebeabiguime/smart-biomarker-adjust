import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CrisisAlertEntity } from "../../utils/consts";
import { ICrisisAlertEntity } from "../Entities/ICrisisAlertEntity";
import { TReceivedDataState } from "./types/TReceivedDataState";

const initialState: TReceivedDataState = {
  oxygenPercentage: 0,
  breathingFrequency: 0,
  crisisAlertEntity: CrisisAlertEntity.MILD,
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
    setCrisisAlertEntity: (
      state,
      action: PayloadAction<ICrisisAlertEntity>
    ) => {
      state.crisisAlertEntity = action.payload;
    },
  },
});

export const receivedDataReducer = receivedDataSlice.reducer;
export const receivedDataActions = receivedDataSlice.actions;
