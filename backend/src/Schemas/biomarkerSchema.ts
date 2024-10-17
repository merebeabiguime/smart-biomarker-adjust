import Joi from "joi";
export const biomarkerSchema = Joi.object({
  name: Joi.string().required(),
  measurementUnit: Joi.string().required(),
});
