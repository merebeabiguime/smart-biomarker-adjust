import Joi from "joi";
import { biomarkerSchema } from "./biomarkerSchema";
export const biomarkerMeasurementSchema = Joi.object({
  hour: Joi.date().required(),
  value: Joi.number().required(),
  biomarker: biomarkerSchema,
});
