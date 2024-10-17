import {
  combineReducers,
  configureStore,
  createAction,
  Reducer,
  StateFromReducersMapObject,
} from "@reduxjs/toolkit";
import { receivedDataReducer } from "./receivedDataSlice";
import { authenticationReducer } from "../../modules/Authentication/slice/authenticationSlice";
import { customFormReducer } from "../Forms/slice/customFormSlice";

const reducers = {
  receivedData: receivedDataReducer,
  authentication: authenticationReducer,
  form: customFormReducer,
};

export type RootState = StateFromReducersMapObject<typeof reducers>;
const combinedReducer: Reducer<RootState> = combineReducers(reducers);

const rootReducer = (
  state: RootState | undefined,
  action: {
    type: "resetStore";
  }
) => {
  if (action.type === "resetStore") {
    // Resets state on resetStore e.g. logout
    return combinedReducer(undefined, action);
  }
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export const resetStore = createAction("resetStore");
