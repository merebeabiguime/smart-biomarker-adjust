import { IBiomarkerEntity } from "../common/Entities/IBiomarkerEntity";
import { IBiomarkerMeasurementEntity } from "../common/Entities/IBiomarkerMeasurementEntity";

export const extractBiomarkerMeasurements = (
  biomarkerId: number,
  measurements: IBiomarkerMeasurementEntity[]
) => {
  let extractedMeasurements: IBiomarkerMeasurementEntity[] = [];

  measurements.map((m) => {
    if (m.biomarker.id === biomarkerId) {
      extractedMeasurements.push(m);
    }
  });
  return extractedMeasurements;
};
