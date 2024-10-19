import { createAsyncThunk } from "@reduxjs/toolkit";
import { TFindAllByDateAndUserIdRequest } from "./types/Requests/TFindAllByDateAndUserIdRequest";
import { apiRequest, MethodEnum } from "../api/api";
import { TFindAllByDateAndUserIdResponse } from "./types/Responses/TFindAllByDateAndUserIdResponse";

export const findAllNotificationByDateAndUserId = createAsyncThunk(
  "biomarker/find-all",
  async (
    request: TFindAllByDateAndUserIdRequest,
    { dispatch, rejectWithValue }
  ) => {
    const response = await apiRequest<TFindAllByDateAndUserIdResponse>(
      `/api/biomarker/find-all/${request.startDate}/${request.endDate}/${request.userId}`,
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
