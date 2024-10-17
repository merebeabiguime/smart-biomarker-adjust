import { Grid2 } from "@mui/material";
import GaugeChart from "../../common/components/GaugeChart/GaugeChart";
import useBiomarker from "../../common/hooks/useBiomarker";
import { BiomarkerTypes } from "../../utils/consts";

export default function BreathingStatus() {
  const { onGetBiomarkerMeasurements } = useBiomarker();
  const measurements = onGetBiomarkerMeasurements(
    BiomarkerTypes.BEATHING_FREQUENCY
  );
  return (
    <Grid2 mb={2} width={"100%"} height={"100%"}>
      <GaugeChart
        value={measurements.length === 0 ? 0 : measurements[0].value}
      />
    </Grid2>
  );
}
