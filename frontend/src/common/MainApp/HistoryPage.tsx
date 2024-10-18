import { Grid2, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import useNotificationRepository from "../Notification/useNotificationRepository";
import { useAppSelector } from "../store/redux";

export default function HistoryPage() {
  const { onFindYesterdayNotification } = useNotificationRepository();
  const authenticatedUser = useAppSelector(
    (state) => state.authentication.user
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
        {" "}
        <Grid2>
          <Typography>caca</Typography>
        </Grid2>
      </Container>
    </>
  );
}
