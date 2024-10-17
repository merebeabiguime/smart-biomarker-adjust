import { User } from "../../Models/User";
import SQUser from "../models/SQUser";

export const sqUserToUser = (sqUser: SQUser): User => {
  return new User(
    sqUser.id,
    sqUser.firstName,
    sqUser.lastName,
    sqUser.password
  );
};
