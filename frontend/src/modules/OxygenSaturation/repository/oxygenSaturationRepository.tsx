import React from "react";
import { useAppDispatch } from "../../../common/store/redux";
import { receivedDataActions } from "../../../common/store/receivedDataSlice";
import { TonSetOxygenSaturationAttributes } from "./types/TonSetOxygenSaturationAttributes";

export default function breathingStatusRepository() {
  const dispatch = useAppDispatch();

  const onSetOxygenSaturation = (
    attributes: TonSetOxygenSaturationAttributes
  ) => {
    dispatch(
      receivedDataActions.setOxygenPercentage(attributes.oxygenPercentage)
    );
  };
  return <div></div>;
}
