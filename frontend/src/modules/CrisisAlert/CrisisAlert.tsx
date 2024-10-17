import React, { useEffect, useState } from "react";
import Alert from "../../common/Alert/Alert";
import { Grid2 } from "@mui/material";
import { useAppSelector } from "../../common/store/redux";
import { AsthmaAttackSeverity } from "../../common/store/types/TReceivedDataState";

export const AsthmaAttackSeverityMessages: Record<
  AsthmaAttackSeverity,
  string
> = {
  INCOMING_ATTACK: "",
  MILD: "Tout est bon ! ",
  MODERATE: "",
  SEVERE: "",
};

export default function CrisisAlert() {
  const healthStatus = useAppSelector(
    (state) => state.receivedData.healthStatus
  );
  const [message, setMessage] = useState<string>(
    AsthmaAttackSeverityMessages.MILD
  );

  const handleHealthStatus = (status: AsthmaAttackSeverity) => {
    switch (status) {
      case AsthmaAttackSeverity.SEVERE: {
        setMessage(AsthmaAttackSeverityMessages.SEVERE);
        break;
      }
      case AsthmaAttackSeverity.MODERATE: {
        setMessage(AsthmaAttackSeverityMessages.MODERATE);
        break;
      }
      case AsthmaAttackSeverity.INCOMING_ATTACK: {
        setMessage(AsthmaAttackSeverityMessages.INCOMING_ATTACK);
        break;
      }
      case AsthmaAttackSeverity.MILD:
      default: {
        setMessage(AsthmaAttackSeverityMessages.MILD);
        break;
      }
    }
  };
  useEffect(() => {}, [healthStatus]);
  return (
    <Grid2>
      <Alert backgroundColor="green" fontColor="white" message={message} />
    </Grid2>
  );
}
