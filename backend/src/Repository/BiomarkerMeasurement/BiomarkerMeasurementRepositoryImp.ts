import { Op } from "sequelize";
import { BiomarkerMeasurementRepository } from "../../Interfaces/BiomarkerMeasurementRepository";
import { BiomarkerMeasurement } from "../../Models/BiomarkerMeasurement";
import { sqBiomarkerMeasurementToBiomarkerMeasurement } from "../../Sequelize/mappers/biomarkerMeasurementMappers";
import SQBiomarkerMeasurement from "../../Sequelize/models/SQBiomarkerMeasurement";
import { biomarkerMeasurement } from "../../utils/namespaces";

export class BiomarkerMeasurementRepositoryImp
  implements BiomarkerMeasurementRepository
{
  async findAllByDateAndUserId(
    attributes: biomarkerMeasurement.FindAllByDateAndUserId
  ): Promise<BiomarkerMeasurement[] | null> {
    const biomarkerMeasurements = await SQBiomarkerMeasurement.findAll({
      where: {
        userId: attributes.userId,
        date: {
          [Op.between]: [attributes.startDate, attributes.endDate], // Date range filter
        },
      },
    });

    if (!biomarkerMeasurements) {
      return null;
    }
    const promises = await Promise.all(
      biomarkerMeasurements.map((m) =>
        sqBiomarkerMeasurementToBiomarkerMeasurement(m)
      )
    );

    return promises.filter(
      (b): b is BiomarkerMeasurement => b !== null || b !== undefined
    );
  }

  async create(
    attributes: biomarkerMeasurement.CreateAttrs
  ): Promise<BiomarkerMeasurement | null> {
    const sqBiomarkerMeasurement = await SQBiomarkerMeasurement.create({
      hour: attributes.biomarkerMeasurement.hour,
      value: attributes.biomarkerMeasurement.value,
      userId: attributes.biomarkerMeasurement.userId,
      biomarkerId: attributes.biomarkerMeasurement.biomarkerId,
    });

    return await sqBiomarkerMeasurementToBiomarkerMeasurement(
      sqBiomarkerMeasurement
    );
  }
}
