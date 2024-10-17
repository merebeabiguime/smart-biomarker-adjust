import { NextFunction, Request, Response } from "express";
import { TReceiveDataRequest } from "./types/Requests/TReceiveDataRequest";
import { ServerResponse } from "../utils/ServerResponse";
import { validateRequestBody } from "../utils/shared";
import { receiveDataRequestSchema } from "../Schemas/receiveDataRequestSchema";

export class BiomarkerController {
  constructor() {}

  receiveData(request: Request, response: Response, next: NextFunction) {
    try {
      validateRequestBody(request, receiveDataRequestSchema);
      const reqBody: TReceiveDataRequest = request.body;
      console.log("received", reqBody);

      //Send notification

      //Return response 200
      ServerResponse.success(response, null);
    } catch (error) {
      next(error);
    }
  }
}
