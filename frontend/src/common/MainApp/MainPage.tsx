import { CircularProgress, Typography, Grid2 } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import BreathingStatus from "../../modules/BreathingStatus/BreathingStatus";
import CrisisAlert from "../../modules/CrisisAlert/CrisisAlert";
import DoseAdministred from "../../modules/DoseAdministered/DoseAdministred";
import OxygenSaturation from "../../modules/OxygenSaturation/OxygenSaturation";
import NavBar from "../NavBar/NavBar";
import { useAppSelector } from "../store/redux";
import Spirometre from "../../modules/Spirometre/Spirometre";

export default function MainPage() {
  const biomarkerNotification = useAppSelector(
    (state) => state.receivedData.biomarkerNotification
  );
  return !biomarkerNotification ? (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <CircularProgress />
      <Typography mt={2}>Chargement des données...</Typography>
    </Box>
  ) : (
    <>
      <NavBar />
      <Container>
        <Grid2 container justifyContent={"center"} mt={4}>
          <Grid2 mb={2} width={"100%"}>
            <Typography textAlign={"center"}>Fréquence de toux</Typography>
          </Grid2>
          <BreathingStatus />
        </Grid2>
        <Grid2 container justifyContent={"center"} mt={4}>
          <Grid2 mb={2} width={"100%"}>
            <Typography textAlign={"center"}>
              Débit expiratoire de pointe
            </Typography>
          </Grid2>
          <Spirometre />
        </Grid2>
        <Grid2 container justifyContent={"center"} mt={4}>
          <Grid2 mb={2} width={"100%"}>
            <Typography textAlign={"center"}>Saturation en oxygène</Typography>
          </Grid2>
          <OxygenSaturation />
        </Grid2>
        <DoseAdministred />
        <Grid2 container justifyContent={"center"} mt={4}>
          <Grid2 mb={2} width={"100%"}>
            <Typography textAlign={"center"}>Mon état de santé</Typography>
          </Grid2>
          <Grid2 mb={2} width={"100%"}>
            <CrisisAlert />
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
}
