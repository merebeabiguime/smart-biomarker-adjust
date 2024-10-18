import {
  BelongsToGetAssociationMixin,
  DataTypes,
  Model,
  Sequelize,
} from "sequelize";
import SQBiomarker from "./SQBiomarker";

export class SQBiomarkerMeasurement extends Model {
  public id!: number;
  public hour!: Date;
  public value!: number;
  public biomarkerId!: number;
  public userId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getBiomarker!: BelongsToGetAssociationMixin<SQBiomarker>;

  // Static method to initialize the model
  static initialize(sequelize: Sequelize) {
    SQBiomarkerMeasurement.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        hour: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        value: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        biomarkerId: {
          type: DataTypes.STRING,
          allowNull: false,
          references: {
            model: "SQBiomarker",
            key: "biomarkerId",
          },
          onDelete: "CASCADE",
        },
        userId: {
          type: DataTypes.STRING,
          allowNull: false,
          references: {
            model: "SQUser",
            key: "userId",
          },
          onDelete: "CASCADE",
        },
      },
      {
        sequelize,
        modelName: "SQBiomarkerMeasurement",
        tableName: "biomarkerMeasurements",
        timestamps: true,
        paranoid: false,
      }
    );
  }

  // Static method to define associations
  static associate(models: any) {
    SQBiomarkerMeasurement.belongsTo(models.SQBiomarker, {
      foreignKey: "biomarkerId",
      as: "biomarker",
    });
    SQBiomarkerMeasurement.belongsTo(models.SQUser, {
      foreignKey: "userId",
      as: "user",
    });
  }
}
export default SQBiomarkerMeasurement;
