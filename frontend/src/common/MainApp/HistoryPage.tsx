import { Grid2, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import useNotificationRepository from "../Notification/useNotificationRepository";
import { useAppSelector } from "../store/redux";
import BiomarkerChart from "../BiomarkerChart/BiomarkerChart";
import { BiomarkerStatus } from "../store/types/TReceivedDataState";

export default function HistoryPage() {
  const { onFindYesterdayNotification } = useNotificationRepository();
  const authenticatedUser = useAppSelector(
    (state) => state.authentication.user
  );
  const previousNotification = useAppSelector(
    (state) => state.receivedData.previousNotification
  );

  const handleFindYesterdayNotification = async (userId: number) => {
    await onFindYesterdayNotification(userId);
  };
  useEffect(() => {
    if (authenticatedUser) {
      handleFindYesterdayNotification(authenticatedUser.id);
    }
  }, [authenticatedUser]);
  return (
    <>
      <NavBar />
      <Container>
        <Grid2>
          {previousNotification && (
            <BiomarkerChart
              measurements={previousNotification.measurements}
              status={BiomarkerStatus.MILD}
              recommendedDosage={0}
              thresholds={{ low: 90, high: 95, medium: 100 }}
            />
          )}
        </Grid2>
      </Container>
    </>
  );
}
