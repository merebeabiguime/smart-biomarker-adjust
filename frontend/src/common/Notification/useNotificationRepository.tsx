import React from "react";
import { useAppDispatch } from "../store/redux";
import { receivedDataActions } from "../store/receivedDataSlice";
import { TsendNewMeasureNotification } from "./types/TsendNewMeasureNotification";
import { IBiomarkerEntity } from "../Entities/IBiomarkerEntity";
import { TBiomakerNotification } from "../services/types/TBiomarkerNotification";
import { BiomarkerStatus } from "../store/types/TReceivedDataState";
import { findAllNotificationByDateAndUserId } from "../services/notificationService";
import { TFindAllByDateAndUserIdRequest } from "../services/types/Requests/TFindAllByDateAndUserIdRequest";
import { addDays, startOfDay, endOfDay } from "date-fns";
import useCrisisAlertRepository from "../../modules/CrisisAlert/repository/useCrisisAlertRepository";

export default function useNotificationRepository() {
  const dispatch = useAppDispatch();
  const { onSetCrisisAlert } = useCrisisAlertRepository();
  const onReceiveNotification = async (
    request: TsendNewMeasureNotification
  ) => {
    dispatch(receivedDataActions.setBiomarkerNotification(request));
    onSetCrisisAlert(request.status);
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
  const onFindYesterdayNotification = async (userId: number) => {
    const today = new Date();
    const yesterday = addDays(today, -1);

    const resultAction = await dispatch(
      findAllNotificationByDateAndUserId({
        startDate: yesterday,
        endDate: today,
        userId: userId,
      })
    );

    if (findAllNotificationByDateAndUserId.rejected.match(resultAction)) {
      throw new Error("Une erreur est survenue. Veuillez réessayer plus tard.");
    }

    dispatch(
      receivedDataActions.setPreviousNotification(
        resultAction.payload.notification
      )
    );

    return resultAction.payload;
  };
  return {
    onReceiveNotification,
    onInitializeNotification,
    onFindYesterdayNotification,
  };
}
