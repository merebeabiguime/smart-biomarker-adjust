import {
  Box,
  Container,
  Grid2,
  Typography,
  CircularProgress,
} from "@mui/material";
import "./App.css";
import GaugeChart from "./common/components/GaugeChart/GaugeChart";
import BreathingStatus from "./modules/BreathingStatus/BreathingStatus";
import OxygenSaturation from "./modules/OxygenSaturation/OxygenSaturation";
import CrisisAlert from "./modules/CrisisAlert/CrisisAlert";
import NavBar from "./common/NavBar/NavBar";
import DoseAdministered from "./modules/DoseAdministered/DoseAdministred";
import { useEffect } from "react";
import { useAppSelector } from "./common/store/redux";

function App() {
  const biomarkerNotification = useAppSelector(
    (state) => state.receivedData.biomarkerNotification
  );

  useEffect(() => {}, []);

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
            <Typography textAlign={"center"}>Fréquence respiratoire</Typography>
          </Grid2>
          <BreathingStatus />
        </Grid2>
        <Grid2 container justifyContent={"center"} mt={4}>
          <Grid2 mb={2} width={"100%"}>
            <Typography textAlign={"center"}>Saturation en oxygène</Typography>
          </Grid2>
          <OxygenSaturation />
        </Grid2>
        <DoseAdministered />
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

export default App;
