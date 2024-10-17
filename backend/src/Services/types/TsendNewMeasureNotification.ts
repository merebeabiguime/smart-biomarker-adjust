import { BiomarkerMeasurement } from "../../Models/BiomarkerMeasurement";
import { BiomarkerStatus } from "../../utils/consts";

export type TsendNewMeasureNotification = {
  measurements: BiomarkerMeasurement[];
  status: BiomarkerStatus;
  recommendedDosage: number;
};
