import { IBiomarkerEntity } from "../common/Entities/IBiomarkerEntity";
import { IBiomarkerMeasurementEntity } from "../common/Entities/IBiomarkerMeasurementEntity";

export const extractBiomarkerMeasurements = (
  biomarkerName: IBiomarkerEntity,
  measurements: IBiomarkerMeasurementEntity[]
) => {
  let extractedMeasurements: IBiomarkerMeasurementEntity[] = [];

  measurements.map((m) => {
    if (m.biomarker.name === biomarkerName.name) {
      extractedMeasurements.push(m);
    }
  });
  return extractedMeasurements;
};
