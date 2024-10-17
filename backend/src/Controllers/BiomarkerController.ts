import { NextFunction, Request, Response } from "express";
import { TReceiveDataRequest } from "./types/Requests/TReceiveDataRequest";
import { ServerResponse } from "../utils/ServerResponse";

export class BiomarkerController {
  constructor() {}

  receiveData(request: Request, response: Response, next: NextFunction) {
    try {
      const reqBody: TReceiveDataRequest = request.body;

      //Send notification

      //Return response 200
      ServerResponse.success(response, null);
    } catch (error) {
      next(error);
    }
  }
}
