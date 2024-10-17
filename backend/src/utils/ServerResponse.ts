import { Response } from "express";

export enum ErrorType {
  AUTHENTICATION_FAILED = "authentication.failed",
  AUTHENTICATION_EMAIL_ALREADY_EXISTS = "authentication.email_already_exists",
  INVALID_INPUT = "validation.invalid_input",
  NOT_FOUND = "resource.not_found",
  INTERNAL_SERVER_ERROR = "server.internal_error",
  BAD_REQUEST = "request.bad_request",
  UNAUTHORIZED = "authorization.unauthorized",
  FILE_UPLOAD_ERROR = "file.upload_error",
  STRIPE_ACCOUNT_NOT_FOUND = "stripeAccount.not_found",
}

export class ServerResponse {
  private constructor() {}

  static safeRemoveUnderscores(obj: any): any {
    if (obj === null || obj === undefined) {
      return obj;
    }

    if (obj instanceof Date) {
      return obj; // Preserve Date objects
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => this.safeRemoveUnderscores(item));
    }

    if (typeof obj === "object") {
      const newObj: { [key: string]: any } = {};
      for (const [key, value] of Object.entries(obj)) {
        const newKey = key.startsWith("_") ? key.slice(1) : key;
        newObj[newKey] = this.safeRemoveUnderscores(value);
      }
      return newObj;
    }

    return obj;
  }

  static success(response: Response, data: any, message?: string): Response {
    let processedData;
    try {
      processedData = this.safeRemoveUnderscores(data);
      console.log("Success:", {
        data: JSON.stringify(processedData, (key, value) =>
          value instanceof Date ? value.toISOString() : value
        ),
        message,
      });
    } catch (error) {
      console.error("Error processing data:", error);
      return this.internalServerError(response, {
        originalData: data,
        processingError: error,
      });
    }

    return response.status(200).json({
      success: true,
      data: processedData,
      message,
    });
  }

  static error(
    response: Response,
    statusCode: number,
    errorType: ErrorType,
    userMessage: string,
    debugInfo?: any
  ): Response {
    console.log("Error:", { statusCode, errorType, userMessage, debugInfo });
    return response.status(statusCode).json({
      success: false,
      error: {
        type: errorType,
        message: userMessage,
      },
    });
  }

  static badRequest(
    response: Response,
    message: string,
    debugInfo?: any
  ): Response {
    return this.error(response, 400, ErrorType.BAD_REQUEST, message, debugInfo);
  }

  static notFound(
    response: Response,
    message: string,
    debugInfo?: any
  ): Response {
    return this.error(response, 404, ErrorType.NOT_FOUND, message, debugInfo);
  }

  static unauthorized(
    response: Response,
    message: string,
    debugInfo?: any
  ): Response {
    return this.error(
      response,
      401,
      ErrorType.UNAUTHORIZED,
      message,
      debugInfo
    );
  }

  static internalServerError(response: Response, debugInfo?: any): Response {
    return this.error(
      response,
      500,
      ErrorType.INTERNAL_SERVER_ERROR,
      "An unexpected error occurred. Please try again later.",
      debugInfo
    );
  }
}
