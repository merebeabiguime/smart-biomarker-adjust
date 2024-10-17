import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CrisisAlertEntity } from "../../utils/consts";
import { ICrisisAlertEntity } from "../Entities/ICrisisAlertEntity";
import { TReceivedDataState } from "./types/TReceivedDataState";
import { TBiomakerNotification } from "../services/types/TBiomarkerNotification";

const initialState: TReceivedDataState = {
  biomarkerNotification: null,
  crisisAlertEntity: CrisisAlertEntity.MILD,
};

const receivedDataSlice = createSlice({
  name: "receivedData",
  initialState,
  reducers: {
    setCrisisAlertEntity: (
      state,
      action: PayloadAction<ICrisisAlertEntity>
    ) => {
      state.crisisAlertEntity = action.payload;
    },
    setBiomarkerNotification: (
      state,
      action: PayloadAction<TBiomakerNotification>
    ) => {
      state.biomarkerNotification = action.payload;
    },
  },
});

export const receivedDataReducer = receivedDataSlice.reducer;
export const receivedDataActions = receivedDataSlice.actions;
