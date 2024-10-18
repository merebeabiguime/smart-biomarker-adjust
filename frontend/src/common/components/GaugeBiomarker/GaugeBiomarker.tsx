import { Grid2 } from "@mui/material";
import GaugeChart from "../GaugeChart/GaugeChart";
import { TGaugeBiomarkerProps } from "./types/TGaugeBiomarkerProps";
import useBiomarker from "../../hooks/useBiomarker";

export default function GaugeBiomarker(props: TGaugeBiomarkerProps) {
  const { onGetBiomarkerMeasurements } = useBiomarker();
  const measurements = onGetBiomarkerMeasurements(props.biomarkerId);
  return (
    <Grid2 mb={2} width={"100%"} height={"100%"}>
      <GaugeChart
        value={measurements.length === 0 ? 0 : measurements[0].value}
      />
    </Grid2>
  );
}
