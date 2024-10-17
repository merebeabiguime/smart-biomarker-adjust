import React from "react";
import GaugeChart from "../../common/components/GaugeChart/GaugeChart";
import { Grid2 } from "@mui/material";
import { useAppSelector } from "../../common/store/redux";

export default function BreathingStatus() {
  const breathingFrequency = useAppSelector(
    (state) => state.receivedData.breathingFrequency
  );
  return (
    <Grid2 mb={2} width={"100%"} height={"100%"}>
      <GaugeChart value={breathingFrequency} />
    </Grid2>
  );
}
