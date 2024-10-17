import Joi from "joi";
import { newUserSchema } from "./newUserSchema";
export const createUserRequestSchema = Joi.object({
  user: newUserSchema,
});
