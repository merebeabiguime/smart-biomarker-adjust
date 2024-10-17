import { User } from "../Models/User";
import { user } from "../utils/namespaces";

export interface UserRepository {
  create(attributes: user.CreateAttrs): Promise<User | null>;
  findByEmailAndPassword(
    attributes: user.FindByEmailAndPasswordAttrs
  ): Promise<User | null>;
}
