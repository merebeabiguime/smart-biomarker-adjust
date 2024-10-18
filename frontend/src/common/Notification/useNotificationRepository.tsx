import React from "react";
import { useAppDispatch } from "../store/redux";
import { receivedDataActions } from "../store/receivedDataSlice";
import { TsendNewMeasureNotification } from "./types/TsendNewMeasureNotification";
import { IBiomarkerEntity } from "../Entities/IBiomarkerEntity";
import { TBiomakerNotification } from "../services/types/TBiomarkerNotification";
import { BiomarkerStatus } from "../store/types/TReceivedDataState";

export default function useNotificationRepository() {
  const dispatch = useAppDispatch();
  const onReceiveNotification = async (
    request: TsendNewMeasureNotification
  ) => {
    dispatch(receivedDataActions.setBiomarkerNotification(request));
  };
  const onInitializeNotification = async () => {
    const biomarkerNotification: TBiomakerNotification = {
      measurements: [],
      status: BiomarkerStatus.MILD,
      recommendedDosage: 0,
    };
    //No measurements
    dispatch(
      receivedDataActions.setBiomarkerNotification(biomarkerNotification)
    );
  };
  return { onReceiveNotification, onInitializeNotification };
}
