import { createAsyncThunk } from "@reduxjs/toolkit";
import { TFindUserByEmailAndPasswordRequest } from "./types/Requests/TFindUserByEmailAndPasswordRequest";
import { apiRequest, MethodEnum } from "../../../common/api/api";
import { TFindUserByEmailAndPasswordResponse } from "./types/Responses/TFindUserByEmailAndPasswordResponse";

export const login = createAsyncThunk(
  "user/login",
  async (
    request: TFindUserByEmailAndPasswordRequest,
    { dispatch, rejectWithValue }
  ) => {
    const response = await apiRequest<TFindUserByEmailAndPasswordResponse>(
      dispatch,
      `/api/user/login/${request.email}/${request.password}`,
      MethodEnum.GET,
      null
    );
    if (response.success) {
      return response.data;
    } else {
      return rejectWithValue(response);
    }
  }
);
