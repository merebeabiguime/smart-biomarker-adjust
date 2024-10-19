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
    biomarkerId: number
  ): IBiomarkerMeasurementEntity[] => {
    if (biomarkerNotification) {
      const sortedBiomarkerMeasurements: IBiomarkerMeasurementEntity[] =
        extractBiomarkerMeasurements(
          biomarkerId,
          biomarkerNotification.measurements
        );
      return sortedBiomarkerMeasurements;
    }
    return [];
  };

  const onGetRecomendedDosage = (): number => {
    return !biomarkerNotification ? 0 : biomarkerNotification.recommendedDosage;
  };

  return { onGetBiomarkerMeasurements, onGetRecomendedDosage };
}
