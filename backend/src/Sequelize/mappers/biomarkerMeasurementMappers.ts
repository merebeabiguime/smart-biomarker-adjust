import { Biomarker } from "../../Models/Biomarker";
import { BiomarkerMeasurement } from "../../Models/BiomarkerMeasurement";
import SQBiomarker from "../models/SQBiomarker";
import SQBiomarkerMeasurement from "../models/SQBiomarkerMeasurement";

export const sqBiomarkerMeasurementToBiomarkerMeasurement = async (
  sqBiomarkerMeasurement: SQBiomarkerMeasurement
): Promise<BiomarkerMeasurement> => {
  console.log("sqBiomarkerMeasurement", sqBiomarkerMeasurement);
  const sqBiomarker: SQBiomarker = await sqBiomarkerMeasurement.getBiomarker();
  const biomarker: Biomarker = new Biomarker(
    sqBiomarker.id,
    sqBiomarker.name,
    sqBiomarker.measurementUnit
  );
  return new BiomarkerMeasurement(
    sqBiomarkerMeasurement.hour,
    sqBiomarkerMeasurement.value,
    biomarker,
    sqBiomarkerMeasurement.userId
  );
};
