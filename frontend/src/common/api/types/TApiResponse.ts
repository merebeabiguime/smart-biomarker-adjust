// Generic success response type
export type TApiSuccessResponse<T> = {
  success: true;
  data: T;
  message?: string;
};

// Error type
export type TApiErrorType =
  | "authentication.failed"
  | "authentication.email_already_exists"
  | "validation.invalid_input"
  | "resource.not_found"
  | "server.internal_error"
  | "request.bad_request"
  | "authorization.unauthorized"
  | "authorization.unauthorized"
  | "stripeAccount.not_found";
// Add more error types as needed

// Error response type
export type TApiErrorResponse = {
  success: false;
  error: {
    type: TApiErrorType;
    message: string;
  };
};

// Combined response type
export type TApiResponse<T> = TApiSuccessResponse<T> | TApiErrorResponse;
