import React from "react";
import Alert from "../../common/Alert/Alert";
import { Grid2 } from "@mui/material";

export default function CrisisAlert() {
  return (
    <Grid2>
      <Alert backgroundColor="green" fontColor="white" message="test" />
    </Grid2>
  );
}
