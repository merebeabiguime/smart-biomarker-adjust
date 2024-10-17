import { Request } from "express";
import Joi from "joi";

export const safeRemoveUnderscores = (obj: any): any => {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (obj instanceof Date) {
    return obj; // Preserve Date objects
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => safeRemoveUnderscores(item));
  }

  if (typeof obj === "object") {
    const newObj: { [key: string]: any } = {};
    for (const [key, value] of Object.entries(obj)) {
      const newKey = key.startsWith("_") ? key.slice(1) : key;
      newObj[newKey] = safeRemoveUnderscores(value);
    }
    return newObj;
  }

  return obj;
};

export const validateRequestBody = (request: Request, schema: Joi.Schema) => {
  const { error } = schema.validate(request.body);
  console.log("schema.validate(request.body)", schema.validate(request.body));
  if (error) {
    throw new Error(error.details[0].message);
  }
};

export const validateRequestParams = (request: Request, schema: Joi.Schema) => {
  const { error } = schema.validate(request.params);
  if (error) {
    throw new Error(error.details[0].message);
  }
};
