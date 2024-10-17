import { IBiomarkerMeasurementEntity } from "../../Entities/IBiomarkerMeasurementEntity";
import { BiomarkerStatus } from "../../store/types/TReceivedDataState";

export type TsendNewMeasureNotification = {
  measurements: IBiomarkerMeasurementEntity[];
  status: BiomarkerStatus;
  recommendedDosage: number;
};
