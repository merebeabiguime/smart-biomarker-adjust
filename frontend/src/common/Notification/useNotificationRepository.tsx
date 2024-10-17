import React from "react";
import { useAppDispatch } from "../store/redux";
import { receivedDataActions } from "../store/receivedDataSlice";
import { TsendNewMeasureNotification } from "./types/TsendNewMeasureNotification";

export default function useNotificationRepository() {
  const dispatch = useAppDispatch();
  const onReceiveNotification = (request: TsendNewMeasureNotification) => {
    dispatch(receivedDataActions.setBiomarkerNotification(request));
  };
  return { onReceiveNotification };
}
