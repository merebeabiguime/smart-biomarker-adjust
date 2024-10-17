import { IBiomarkerEntity } from "../../Entities/IBiomarkerEntity";
import { IBiomarkerMeasurementEntity } from "../../Entities/IBiomarkerMeasurementEntity";
import { ICrisisAlertEntity } from "../../Entities/ICrisisAlertEntity";
import { TBiomakerNotification } from "../../services/types/TBiomarkerNotification";

export enum BiomarkerStatus {
  MILD = "MILD",
  MODERATE = "MODERATE",
  SEVERE = "SEVERE",
  INCOMING_ATTACK = "INCOMING_ATTACK",
}

export type TReceivedDataState = {
  biomarkerNotification: TBiomakerNotification | null;
  crisisAlertEntity: ICrisisAlertEntity;
};
