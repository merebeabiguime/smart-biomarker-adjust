import { DataTypes, Model, Sequelize } from "sequelize";

export class SQBiomarker extends Model {
  public id!: number;
  public name!: string;
  public measurementUnit!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Static method to initialize the model
  static initialize(sequelize: Sequelize) {
    SQBiomarker.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        measurementUnit: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "SQBiomarker",
        tableName: "biomarkers",
        timestamps: true,
        paranoid: false,
      }
    );
  }

  // Static method to define associations
  static associate(models: any) {
    SQBiomarker.hasMany(models.SQBiomarkerMeasurement, {
      foreignKey: "biomarkerId",
      as: "biomarkerMeasurements",
    });
  }
}
export default SQBiomarker;
