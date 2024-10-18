import { IBiomarkerMeasurementEntity } from "../../../Entities/IBiomarkerMeasurementEntity";
import { BiomarkerStatus } from "../../../store/types/TReceivedDataState";

export type TReceiveDataRequest = {
  measurements: IBiomarkerMeasurementEntity[];
  status: BiomarkerStatus;
  recommendedDosage: number;
};
