import { IBiomarkerEntity } from "./IBiomarkerEntity";

export interface IBiomarkerMeasurementEntity {
  hour: Date;
  value: number;
  biomarker: IBiomarkerEntity;
}
