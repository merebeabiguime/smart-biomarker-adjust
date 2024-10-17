import React from "react";
import { Grid, Typography } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";
import { useFormContext, FieldValues, Path } from "react-hook-form";

export type TErrorMessageProps = {
  message: string;
};

const ErrorMessage = (props: TErrorMessageProps) => {
  return (
    <Grid container spacing={1} alignItems="center" mt={1}>
      <Grid item>
        <ErrorOutline color="error" fontSize="small" />
      </Grid>
      <Grid item xs>
        <Typography
          variant="body2"
          color="error"
          sx={{
            fontSize: "0.75rem",
            lineHeight: 1.66,
          }}
        >
          {props.message}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ErrorMessage;
