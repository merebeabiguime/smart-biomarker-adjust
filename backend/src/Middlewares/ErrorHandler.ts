import { Request, Response, NextFunction } from "express";
import { ServerResponse } from "../utils/ServerResponse";
export function errorHandler(
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) {
  // Check if the error is a known error (e.g., one that you've thrown intentionally)
  if (error instanceof Error) {
    // Send an appropriate response for known errors
    return ServerResponse.badRequest(response, error.message); // Assuming you want to send the error message to the client
  }
  // Log the error (use a proper logger library)
  console.error("Unhandled error:", error);

  // If it's not a known error, send a generic internal server error response
  ServerResponse.internalServerError(response);
}
