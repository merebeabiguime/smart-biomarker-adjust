import Joi from "joi";
import { biomarkerMeasurementSchema } from "./biomarkerMeasurementSchema";

export const receiveDataRequestSchema = Joi.object({
  measurements: Joi.array().items(biomarkerMeasurementSchema),
  status: Joi.string().required(),
  recommendedDosage: Joi.number().required(),
});
