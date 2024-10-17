import { TCreateUserAttributes } from "../Repository/User/types/TCreateAttributes";
import { TFindUserByEmailAndPasswordAttributes } from "../Repository/User/types/TFindByEmailAndPasswordAttributes";

export namespace user {
  export type CreateAttrs = TCreateUserAttributes;
  export type FindByEmailAndPasswordAttrs =
    TFindUserByEmailAndPasswordAttributes;
}
