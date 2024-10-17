export enum AsthmaAttackSeverity {
  MILD = "MILD",
  MODERATE = "MODERATE",
  SEVERE = "SEVERE",
  INCOMING_ATTACK = "INCOMING_ATTACK",
}

export type TReceivedDataState = {
  oxygenPercentage: number;
  breathingFrequency: number;
  healthStatus: AsthmaAttackSeverity;
};
