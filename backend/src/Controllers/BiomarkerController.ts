import { NextFunction, Request, Response } from "express";
import { TReceiveDataRequest } from "./types/Requests/TReceiveDataRequest";
import { ServerResponse } from "../utils/ServerResponse";
import { validateRequestBody } from "../utils/shared";
import { receiveDataRequestSchema } from "../Schemas/receiveDataRequestSchema";
import { NotificationService } from "../Interfaces/NotificationService";

export class BiomarkerController {
  private _notificationService: NotificationService;
  constructor(notificationService: NotificationService) {
    this._notificationService = notificationService;
  }

  async receiveData(request: Request, response: Response, next: NextFunction) {
    try {
      validateRequestBody(request, receiveDataRequestSchema);
      const reqBody: TReceiveDataRequest = request.body;
      console.log("received", reqBody);

      //Send notification
      await this._notificationService.sendNewMeasureNotification(reqBody);

      //Return response 200
      ServerResponse.success(response, null);
    } catch (error) {
      next(error);
    }
  }
}
