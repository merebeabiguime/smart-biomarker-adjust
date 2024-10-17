import { ICrisisAlertEntity } from "../../Entities/ICrisisAlertEntity";

export enum AsthmaAttackSeverity {
  MILD = "MILD",
  MODERATE = "MODERATE",
  SEVERE = "SEVERE",
  INCOMING_ATTACK = "INCOMING_ATTACK",
}

export type TReceivedDataState = {
  oxygenPercentage: number;
  breathingFrequency: number;
  crisisAlertEntity: ICrisisAlertEntity;
};
