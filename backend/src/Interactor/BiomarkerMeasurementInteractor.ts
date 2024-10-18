import { BiomarkerMeasurementRepository } from "../Interfaces/BiomarkerMeasurementRepository";
import { BiomarkerMeasurement } from "../Models/BiomarkerMeasurement";
import { biomarkerMeasurement } from "../utils/namespaces";

export class BiomarkerMeasurementInteractor {
  private _biomarkerMeasurementRepository: BiomarkerMeasurementRepository;

  constructor(biomarkerMeasurementRepository: BiomarkerMeasurementRepository) {
    this._biomarkerMeasurementRepository = biomarkerMeasurementRepository;
  }

  async create(
    attributes: biomarkerMeasurement.CreateAttrs
  ): Promise<BiomarkerMeasurement> {
    const biomarkerMeasurement =
      await this._biomarkerMeasurementRepository.create(attributes);

    if (!biomarkerMeasurement) {
      throw new Error("Measurement could not be created");
    }
    return biomarkerMeasurement;
  }

  async findAllByDateAndUserId(
    attributes: biomarkerMeasurement.FindAllByDateAndUserId
  ): Promise<BiomarkerMeasurement[]> {
    const biomarkerMeasurements =
      await this._biomarkerMeasurementRepository.findAllByDateAndUserId(
        attributes
      );
    if (!biomarkerMeasurements) {
      return [];
    }
    return biomarkerMeasurements;
  }
}
