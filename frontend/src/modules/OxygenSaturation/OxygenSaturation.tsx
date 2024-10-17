import { Grid2 } from "@mui/material";
import GaugeChart from "../../common/components/GaugeChart/GaugeChart";
import { useAppSelector } from "../../common/store/redux";

export default function OxygenStaturation() {
  const oxygenPercentage = useAppSelector(
    (state) => state.receivedData.oxygenPercentage
  );
  return (
    <Grid2 mb={2} width={"100%"} height={"100%"}>
      <GaugeChart value={oxygenPercentage} />
    </Grid2>
  );
}
