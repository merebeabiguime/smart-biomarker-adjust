import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { TCustomFormState } from "./types/TCustomFormState";

const initialState: TCustomFormState = {
  forms: {},
};

const customFormSlice = createSlice({
  name: "customForm",
  initialState,
  reducers: {
    initializeForm: (state, action: PayloadAction<string>) => {
      if (!state.forms[action.payload]) {
        state.forms[action.payload] = {
          error: null,
          loading: false,
          success: false,
          fieldErrors: {},
        };
      }
    },
    setLoading: (state, action: PayloadAction<string>) => {
      const form = state.forms[action.payload];
      if (form) {
        form.loading = true;
      }
    },
    setFormError: (
      state,
      action: PayloadAction<{ name: string; message: string }>
    ) => {
      const form = state.forms[action.payload.name];
      if (form) {
        form.error = action.payload.message;
        form.loading = false;
        form.success = false;
      }
    },
    setFieldErrors: (
      state,
      action: PayloadAction<{ name: string; errors: Record<string, string> }>
    ) => {
      const form = state.forms[action.payload.name];
      if (form) {
        form.fieldErrors = action.payload.errors;
        form.loading = false;
        form.success = false;
      }
    },
    setFormSuccess: (state, action: PayloadAction<string>) => {
      const form = state.forms[action.payload];
      if (form) {
        form.success = true;
        form.loading = false;
        form.error = null;
        form.fieldErrors = {};
      }
    },
    resetForm: (state, action: PayloadAction<string>) => {
      const form = state.forms[action.payload];
      if (form) {
        form.success = false;
        form.loading = false;
        form.error = null;
        form.fieldErrors = {};
      }
    },
  },
});

export const customFormReducer = customFormSlice.reducer;
export const customFormActions = customFormSlice.actions;
