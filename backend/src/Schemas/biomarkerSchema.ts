import Joi from "joi";
export const biomarkerSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
  measurementUnit: Joi.string().required(),
});
