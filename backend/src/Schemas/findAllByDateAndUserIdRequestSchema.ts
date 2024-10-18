import Joi from "joi";

export const findAllByDateAndUserIdRequestSchema = Joi.object({
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  userId: Joi.number().required(),
});
