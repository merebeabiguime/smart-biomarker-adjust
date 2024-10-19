import { Grid2 } from "@mui/material";
import Alert from "../../common/Alert/Alert";
import { useAppSelector } from "../../common/store/redux";
import { useEffect } from "react";

export default function CrisisAlert() {
  const crisisAlertEntity = useAppSelector(
    (state) => state.receivedData.crisisAlertEntity
  );

  useEffect(() => {
    console.log("crisisAlertEntitychanged");
  }, [crisisAlertEntity]);
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
