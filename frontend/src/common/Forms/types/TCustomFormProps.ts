import { SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

export type TCustomFormProps<T extends FieldValues> = {
  onSubmit: SubmitHandler<T>;
  onSuccess: () => void;
  children: ReactNode;
  submitDisabled?: boolean;
  name: string;
  buttonStyle?: SxProps<Theme>;
  defaultButtonText?: string;
  useCustomButton?: boolean;
};
