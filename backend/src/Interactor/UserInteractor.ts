import { UserRepository } from "../Interfaces/UserRepository";
import { User } from "../Models/User";
import { user } from "../utils/namespaces";

export class UserInteractor {
  private _userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this._userRepository = userRepository;
  }

  async create(attributes: user.CreateAttrs): Promise<User> {
    const user = await this._userRepository.create(attributes);

    if (!user) {
      throw new Error("User could not be created");
    }
    return user;
  }

  async findByEmailAndPassword(
    attributes: user.FindByEmailAndPasswordAttrs
  ): Promise<User> {
    const user = await this._userRepository.findByEmailAndPassword(attributes);
    if (!user) {
      throw new Error("User could not be found");
    }
    return user;
  }
}
