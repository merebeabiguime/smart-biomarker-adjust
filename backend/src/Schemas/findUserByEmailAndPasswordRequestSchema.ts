import Joi from "joi";
export const findUserByEmailAndPasswordRequestSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
