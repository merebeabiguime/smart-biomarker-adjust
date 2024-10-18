import axios from "axios";
import {
  TApiResponse,
  TApiSuccessResponse,
  TApiErrorResponse,
} from "./types/TApiResponse";

export enum MethodEnum {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const apiRequest = async <T>(
  dispatch: any,
  url: string,
  methodEnum: MethodEnum,
  body: any = null,
  multipart: boolean = false,
  menuAccessHeader?: string
): Promise<TApiResponse<T>> => {
  try {
    let headers: any = {};

    const axiosConfig = {
      method: methodEnum,
      url,
      headers,
      data: body,
    };

    axiosConfig.data = body;

    const response = await axiosInstance(axiosConfig);
    const data: TApiSuccessResponse<T> = response.data;

    console.log(
      `URL: ${url}, body: ${JSON.stringify(body)}, data: ${JSON.stringify(
        data.data
      )}, message: ${data.message}`
    );
    return data;
  } catch (err: any) {
    console.error(err);
    if (err.response && err.response.data) {
      const errorData: TApiErrorResponse = err.response.data;
      console.log(
        `URL: ${url}, body: ${JSON.stringify(body)}, error: ${JSON.stringify(
          errorData.error
        )}`
      );
      return errorData;
    } else {
      // If the error doesn't have a response (e.g., network error), create a generic error response
      const genericError: TApiErrorResponse = {
        success: false,
        error: {
          type: "server.internal_error",
          message: "An unexpected error occurred. Please try again later.",
        },
      };
      console.log(
        `URL: ${url}, body: ${JSON.stringify(body)}, error: ${JSON.stringify(
          genericError.error
        )}`
      );
      return genericError;
    }
  }
};
