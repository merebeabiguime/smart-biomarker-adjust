import React from "react";
import { useAppDispatch } from "../../../common/store/redux";
import { TonSetBreathingStatusAttributes } from "./types/TonSetBreathingStatusAttributes";
import { receivedDataActions } from "../../../common/store/receivedDataSlice";

export default function breathingStatusRepository() {
  const dispatch = useAppDispatch();

  const onSetBreathingStatus = (
    attributes: TonSetBreathingStatusAttributes
  ) => {
    dispatch(
      receivedDataActions.setOxygenPercentage(attributes.breathingFrequency)
    );
  };
  return <div></div>;
}
