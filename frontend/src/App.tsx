import { Box, Container, Grid2, Typography } from "@mui/material";
import "./App.css";
import GaugeChart from "./common/components/GaugeChart/GaugeChart";
import BreathingStatus from "./modules/BreathingStatus/BreathingStatus";
import OxygenStaturation from "./modules/OxygenSaturation/OxygenSaturation";
import CrisisAlert from "./modules/CrisisAlert/CrisisAlert";
import NavBar from "./common/NavBar/NavBar";

function App() {
  return (
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

          <OxygenStaturation />
        </Grid2>
        <Grid2 container justifyContent={"center"} mt={4}>
          <Grid2>
            <Typography>
              Dose d'administration recommandée :
              <span style={{ fontWeight: "bold" }}> 4mg</span>
            </Typography>
          </Grid2>
        </Grid2>
        <Grid2 container justifyContent={"center"} mt={4}>
          <Grid2 mb={2} width={"100%"}>
            <Typography textAlign={"center"}>Mon état de santé</Typography>
          </Grid2>
          <CrisisAlert />
        </Grid2>
      </Container>
    </>
  );
}

export default App;
