import { UserRepository } from "../../Interfaces/UserRepository";
import { User } from "../../Models/User";
import { sqUserToUser } from "../../Sequelize/mappers/userMappers";
import SQUser from "../../Sequelize/models/SQUser";
import { user } from "../../utils/namespaces";

export class UserRepositoryImp implements UserRepository {
  async findByEmailAndPassword(
    attributes: user.FindByEmailAndPasswordAttrs
  ): Promise<User | null> {
    const sqUser = await SQUser.findOne({
      where: { email: attributes.email, password: attributes.password },
    });

    if (!sqUser) {
      return null;
    }
    console.log("sqUser", sqUser);

    return sqUserToUser(sqUser);
  }

  async create(attributes: user.CreateAttrs): Promise<User | null> {
    const sqUser = await SQUser.create({
      firstName: attributes.user.firstName,
      lastName: attributes.user.lastName,
      email: attributes.user.email,
      password: attributes.user.password,
    });

    return sqUserToUser(sqUser);
  }
}
