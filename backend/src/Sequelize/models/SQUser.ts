import { DataTypes, Model, Sequelize } from "sequelize";

export class SQUser extends Model {
  public id!: number;
  public email!: string;
  public firstName!: string;
  public lastName!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Static method to initialize the model
  static initialize(sequelize: Sequelize) {
    SQUser.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "SQUser",
        tableName: "users",
        timestamps: true,
        paranoid: false,
      }
    );
  }

  // Static method to define associations
  static associate(models: any) {
    SQUser.hasMany(models.SQBiomarkerMeasurement, {
      foreignKey: "userId",
      as: "biomarkerMeasurements",
    });
  }
}

export default SQUser;
