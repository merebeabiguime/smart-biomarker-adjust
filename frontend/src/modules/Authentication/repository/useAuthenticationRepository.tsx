import React from "react";
import { TFindUserByEmailAndPasswordRequest } from "../service/types/Requests/TFindUserByEmailAndPasswordRequest";
import { TFindUserByEmailAndPasswordResponse } from "../service/types/Responses/TFindUserByEmailAndPasswordResponse";
import { useAppDispatch } from "../../../common/store/redux";
import { login } from "../service/useAuthenticationService";
import { authenticationActions } from "../slice/authenticationSlice";
import { saveAuth } from "../../../utils/auth";

export default function useAuthenticationRepository() {
  const dispatch = useAppDispatch();
  const onLogin = async (
    request: TFindUserByEmailAndPasswordRequest
  ): Promise<TFindUserByEmailAndPasswordResponse> => {
    const resultAction = await dispatch(login(request));

    if (login.rejected.match(resultAction)) {
      throw new Error("Une erreur est survenue. Veuillez réessayer plus tard.");
    }

    dispatch(authenticationActions.setUser(resultAction.payload.user));

    return resultAction.payload;
  };
  return { onLogin };
}
