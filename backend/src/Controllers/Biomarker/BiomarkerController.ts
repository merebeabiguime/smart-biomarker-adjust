import { NextFunction, Request, Response } from "express";
import { TReceiveDataRequest } from "./types/Requests/TReceiveDataRequest";
import { ServerResponse } from "../../utils/ServerResponse";
import { validateRequestBody, validateRequestParams } from "../../utils/shared";
import { receiveDataRequestSchema } from "../../Schemas/receiveDataRequestSchema";
import { NotificationService } from "../../Interfaces/NotificationService";
import { BiomarkerMeasurementInteractor } from "../../Interactor/BiomarkerMeasurementInteractor";
import { TFindAllByDateAndUserIdRequest } from "./types/Requests/TFindAllByDateAndUserIdRequest";
import { findAllByDateAndUserIdRequestSchema } from "../../Schemas/findAllByDateAndUserIdRequestSchema";
import { TFindAllByDateAndUserIdResponse } from "./types/Responses/TFindAllByDateAndUserIdResponse";
import { BiomarkerStatus } from "../../utils/consts";

export class BiomarkerController {
  private _notificationService: NotificationService;
  private _biomarkerMeasurementInteractor: BiomarkerMeasurementInteractor;
  constructor(
    notificationService: NotificationService,
    biomarkerMeasurementInteractor: BiomarkerMeasurementInteractor
  ) {
    this._notificationService = notificationService;
    this._biomarkerMeasurementInteractor = biomarkerMeasurementInteractor;
  }

  async receiveData(request: Request, response: Response, next: NextFunction) {
    try {
      validateRequestBody(request, receiveDataRequestSchema);
      const reqBody: TReceiveDataRequest = request.body;
      console.log("received", reqBody);

      //Add data to db
      await Promise.all(
        reqBody.measurements.map(async (m) => {
          await this._biomarkerMeasurementInteractor.create({
            biomarkerMeasurement: {
              hour: m.hour,
              value: m.value,
              userId: m.userId,
              biomarkerId: m.biomarker.id,
            },
          });
        })
      );

      //Send notification
      await this._notificationService.sendNewMeasureNotification(reqBody);

      //Return response 200
      ServerResponse.success(response, null);
    } catch (error) {
      next(error);
    }
  }
  async findAllByDateAndUserId(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      validateRequestParams(request, findAllByDateAndUserIdRequestSchema);
      const reqParams: TFindAllByDateAndUserIdRequest = {
        userId: parseInt(request.params.userId),
        startDate: new Date(request.params.startDate),
        endDate: new Date(request.params.endDate),
      };

      const measurements =
        await this._biomarkerMeasurementInteractor.findAllByDateAndUserId({
          startDate: reqParams.startDate,
          endDate: reqParams.endDate,
          userId: reqParams.userId,
        });

      const data: TFindAllByDateAndUserIdResponse = {
        notification: {
          measurements: measurements,
          status: BiomarkerStatus.MILD,
          recommendedDosage: 0,
        },
      };
      //Return response 200
      ServerResponse.success(response, null);
    } catch (error) {
      next(error);
    }
  }
}
