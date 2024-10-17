import { BiomarkerMeasurement } from "../../../../Models/BiomarkerMeasurement";
import { BiomarkerStatus } from "../../../../utils/consts";

export type TReceiveDataRequest = {
  measurements: BiomarkerMeasurement[];
  status: BiomarkerStatus;
  recommendedDosage: number;
};
