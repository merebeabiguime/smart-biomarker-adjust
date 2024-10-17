import { Button, CircularProgress, Grid } from "@mui/material";
import { useCallback, useEffect, useRef, useMemo } from "react";
import {
  FieldError,
  FieldValues,
  FormProvider,
  Path,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../store/redux";
import { customFormActions } from "./slice/customFormSlice";
import { TCustomFormProps } from "./types/TCustomFormProps";
import DefaultErrorDisplay from "./DefaultErrorDisplay";

// Utility function to extract error message
const getErrorMessage = (error: FieldError): string | null => {
  if (typeof error === "string") return error;
  if (error?.message && typeof error.message === "string") return error.message;
  return "Invalid field";
};

export const capitalizeFirstLetter = (value: string) => {
  if (value.length === 0) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
};

// Component for rendering the submit button
const SubmitButton = ({
  formState,
  methods,
  submitHandler,
  defaultButtonText,
  buttonStyle,
  submitDisabled,
}: any) => (
  <Button
    type="button"
    sx={{
      color: "white",
      textTransform: "none",
      backgroundColor: "#273551",
      minWidth: "35%",
      "&:hover": {
        backgroundColor: "rgba(39, 53, 81, 0.9)",
      },
      "&:disabled": {
        backgroundColor: "rgba(39, 53, 81, 0.2)",
      },
      ...buttonStyle,
    }}
    disabled={
      formState?.loading ||
      Object.keys(methods.formState.errors).length > 0 ||
      submitDisabled
    }
    onClick={() => methods.handleSubmit(submitHandler)()}
  >
    {formState?.loading ? (
      <CircularProgress size={24} color="inherit" />
    ) : (
      defaultButtonText
    )}
  </Button>
);

const CustomForm = <T extends FieldValues>({
  children,
  defaultButtonText = "Submit",
  useCustomButton = false,
  name,
  onSubmit,
  onSuccess,
  submitDisabled,
  buttonStyle,
  useDefaultErrorDisplay = true,
  defaultErrorDisplayCollapse = false,
}: TCustomFormProps<T> & {
  useDefaultErrorDisplay?: boolean;
  defaultErrorDisplayCollapse?: boolean;
}) => {
  const methods = useForm<T>({ mode: "onChange" });
  const dispatch = useAppDispatch();
  const formState = useAppSelector((state) => state.form.forms[name]);
  const formRef = useRef<HTMLFormElement>(null);

  // Initialize and reset form state on mount/unmount
  useEffect(() => {
    dispatch(customFormActions.initializeForm(name));
    return () => {
      dispatch(customFormActions.resetForm(name));
      methods.reset();
    };
  }, [dispatch, name, methods]);

  // Update form errors
  const prevErrorsRef = useRef<Record<string, string>>({});
  useEffect(() => {
    const fieldErrors = Object.entries(methods.formState.errors).reduce(
      (acc, [key, value]) => {
        const errorMessage = getErrorMessage(value as FieldError);
        if (errorMessage) acc[key] = errorMessage;
        return acc;
      },
      {} as Record<string, string>
    );

    if (JSON.stringify(fieldErrors) !== JSON.stringify(prevErrorsRef.current)) {
      dispatch(customFormActions.setFieldErrors({ name, errors: fieldErrors }));
      prevErrorsRef.current = fieldErrors;
    }
  }, [methods.formState, dispatch, name]);

  // Handle form submission
  const submitHandler = useCallback<SubmitHandler<T>>(
    async (data: T) => {
      try {
        dispatch(customFormActions.setLoading(name));
        await onSubmit(data);
        dispatch(customFormActions.setFormSuccess(name));
        methods.reset();
        onSuccess?.();
        dispatch(customFormActions.resetForm(name));
      } catch (error: any) {
        console.error(error);
        dispatch(
          customFormActions.setFormError({
            name,
            message: error.message,
          })
        );
      }
    },
    [onSubmit, onSuccess, dispatch, name, methods]
  );

  const handleKeyDown = async (event: KeyboardEvent) => {
    try {
      if (event.key === "Enter" && formRef.current) {
        event.preventDefault();
        const inputs = Array.from(
          formRef.current.querySelectorAll("input, select, textarea")
        );
        const currentIndex = inputs.findIndex(
          (input) => input === document.activeElement
        );

        if (currentIndex < inputs.length - 1) {
          const currentField = inputs[currentIndex] as HTMLInputElement;
          const nextField = inputs[currentIndex + 1] as HTMLElement;

          if (await methods.trigger(currentField.name as Path<T>)) {
            nextField.focus();
          }
        } else {
          methods.handleSubmit(submitHandler)();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Handle "Enter" key navigation and submission
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [methods, submitHandler]);

  // Trigger validation on field change
  useEffect(() => {
    const subscription = methods.watch((_, { name }) => {
      if (name) methods.trigger(name as Path<T>);
    });
    return () => subscription.unsubscribe();
  }, [methods]);

  return (
    formState && (
      <FormProvider {...methods}>
        <form
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
            methods.handleSubmit(submitHandler)();
          }}
        >
          <Grid container direction={"column"}>
            <Grid container justifyContent={"center"}>
              {useDefaultErrorDisplay && (
                <DefaultErrorDisplay
                  formState={formState}
                  collapse={defaultErrorDisplayCollapse}
                />
              )}
            </Grid>
            {children}
            <Grid container justifyContent={"center"}>
              {!useCustomButton && (
                <SubmitButton
                  formState={formState}
                  methods={methods}
                  submitHandler={submitHandler}
                  defaultButtonText={defaultButtonText}
                  buttonStyle={buttonStyle}
                  submitDisabled={submitDisabled}
                />
              )}
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    )
  );
};

export { CustomForm };
