import { TCreateBiomarkerMeasurementAttributes } from "../Repository/BiomarkerMeasurement/types/TCreateAttributes";
import { TFindAllBiomarkerMeasurementByDateAndUserId } from "../Repository/BiomarkerMeasurement/types/TFindAllByDateAndUserId";
import { TCreateUserAttributes } from "../Repository/User/types/TCreateAttributes";
import { TFindUserByEmailAndPasswordAttributes } from "../Repository/User/types/TFindByEmailAndPasswordAttributes";

export namespace user {
  export type CreateAttrs = TCreateUserAttributes;
  export type FindByEmailAndPasswordAttrs =
    TFindUserByEmailAndPasswordAttributes;
}
export namespace biomarkerMeasurement {
  export type CreateAttrs = TCreateBiomarkerMeasurementAttributes;
  export type FindAllByDateAndUserId =
    TFindAllBiomarkerMeasurementByDateAndUserId;
}
