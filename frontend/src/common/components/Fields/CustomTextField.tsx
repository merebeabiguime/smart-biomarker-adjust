import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { TCustomTextFieldProps } from "./types/TCustomTextFieldProps";

const CustomTextField = (props: TCustomTextFieldProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={props.name}
      control={control}
      rules={props.validation}
      render={({ field }) => (
        <TextField
          {...field}
          value={field.value || ""}
          onChange={(e) => field.onChange(e.target.value)}
          label={props.label}
          variant="standard"
          type={props.password ? "password" : "text"}
          fullWidth
        />
      )}
    />
  );
};

export default CustomTextField;
