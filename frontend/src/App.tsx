import { Box, Container, Grid2, Typography } from "@mui/material";
import "./App.css";
import GaugeChart from "./common/components/GaugeChart/GaugeChart";
import BreathingStatus from "./modules/BreathingStatus/BreathingStatus";
import OxygenStaturation from "./modules/OxygenSaturation/OxygenSaturation";

function App() {
  return (
    <Container>
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
          <Typography textAlign={"center"}>
            Evolution de la respiration
          </Typography>
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
        <Grid2 mb={2} width={"100%"}>
          <Typography textAlign={"center"}>Mon état de santé</Typography>
        </Grid2>
        <Grid2 width={"80%"}>
          <Box
            sx={{
              backgroundColor: "green",
              p: 2,
              boxShadow: " 0px 4px 6px rgba(0, 0, 0, 0.1)",
              minHeight: "75px",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography textAlign={"center"} sx={{ color: "white" }}>
              Tout est bon !
            </Typography>
          </Box>
        </Grid2>
      </Grid2>
    </Container>
  );
}

export default App;
