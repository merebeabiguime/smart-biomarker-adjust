import { BiomarkerMeasurement } from "../Models/BiomarkerMeasurement";
import { biomarkerMeasurement } from "../utils/namespaces";

export interface BiomarkerMeasurementRepository {
  create(
    attributes: biomarkerMeasurement.CreateAttrs
  ): Promise<BiomarkerMeasurement | null>;
  findAllByDateAndUserId(
    attributes: biomarkerMeasurement.FindAllByDateAndUserId
  ): Promise<BiomarkerMeasurement[] | null>;
}
