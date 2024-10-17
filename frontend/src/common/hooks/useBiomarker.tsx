import React from "react";
import { useAppSelector } from "../store/redux";
import { IBiomarkerMeasurementEntity } from "../Entities/IBiomarkerMeasurementEntity";
import { extractBiomarkerMeasurements } from "../../utils/shared";
import { IBiomarkerEntity } from "../Entities/IBiomarkerEntity";

export default function useBiomarker() {
  const biomarkerNotification = useAppSelector(
    (state) => state.receivedData.biomarkerNotification
  );

  const onGetBiomarkerMeasurements = (
    biomarker: IBiomarkerEntity
  ): IBiomarkerMeasurementEntity[] => {
    if (biomarkerNotification) {
      const sortedBiomarkerMeasurements: IBiomarkerMeasurementEntity[] =
        extractBiomarkerMeasurements(
          biomarker,
          biomarkerNotification.measurements
        );
      return sortedBiomarkerMeasurements;
    }
    return [];
  };

  return { onGetBiomarkerMeasurements };
}
