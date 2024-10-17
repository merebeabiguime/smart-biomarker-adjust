import { Grid2 } from "@mui/material";
import Alert from "../../common/Alert/Alert";
import { useAppSelector } from "../../common/store/redux";

export default function CrisisAlert() {
  const crisisAlertEntity = useAppSelector(
    (state) => state.receivedData.crisisAlertEntity
  );
  return (
    <Grid2>
      <Alert
        backgroundColor={crisisAlertEntity.backgroundColor}
        fontColor={crisisAlertEntity.fontColor}
        message={crisisAlertEntity.message}
      />
    </Grid2>
  );
}
