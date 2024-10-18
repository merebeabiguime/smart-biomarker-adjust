import { NextFunction, Request, Response } from "express";
import { UserInteractor } from "../../Interactor/UserInteractor";
import { createUserRequestSchema } from "../../Schemas/createUserRequestSchema";
import { findUserByEmailAndPasswordRequestSchema } from "../../Schemas/findUserByEmailAndPasswordRequestSchema";
import { ServerResponse } from "../../utils/ServerResponse";
import { validateRequestBody, validateRequestParams } from "../../utils/shared";
import { TCreateUserRequestSchema } from "./types/Requests/TCreateUserRequestSchema";
import { TFindUserByEmailAndPasswordRequest } from "./types/Requests/TFindUserByEmailAndPasswordRequest";
import { TCreateUserResponseSchema } from "./types/Responses/TCreateUserResponseSchema";
import { TFindUserByEmailAndPasswordResponse } from "./types/Responses/TFindUserByEmailAndPasswordResponse";

export class UserController {
  private _userInteractor: UserInteractor;
  constructor(userInteractor: UserInteractor) {
    this._userInteractor = userInteractor;
  }

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      validateRequestBody(request, createUserRequestSchema);
      const reqBody: TCreateUserRequestSchema = request.body;

      const createdUser = await this._userInteractor.create({
        user: reqBody.user,
      });

      const data: TCreateUserResponseSchema = {
        user: createdUser,
      };

      //Return response 200
      ServerResponse.success(response, data);
    } catch (error) {
      next(error);
    }
  }

  async findByEmailAndPassword(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      console.log("cacaboudain");
      validateRequestParams(request, findUserByEmailAndPasswordRequestSchema);
      const reqParams: TFindUserByEmailAndPasswordRequest = {
        email: request.params.email,
        password: request.params.password,
      };

      const foundUser = await this._userInteractor.findByEmailAndPassword({
        email: reqParams.email,
        password: reqParams.password,
      });

      const data: TFindUserByEmailAndPasswordResponse = {
        user: foundUser,
      };

      //Return response 200
      ServerResponse.success(response, data);
    } catch (error) {
      next(error);
    }
  }
}
