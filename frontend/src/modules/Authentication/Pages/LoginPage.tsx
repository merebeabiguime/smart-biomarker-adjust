import { Grid2, Typography } from "@mui/material";
import { Container } from "@mui/system";
import Logo from "../../../common/images/logo.png";
import React from "react";

export default function LoginPage() {
  return (
    <Container>
      <Grid2 container justifyContent={"center"}>
        <Grid2 mt={4}>
          <Typography
            sx={{ fontSize: "24px", fontWeight: "bold", textAlign: "center" }}
          >
            Wow : un coup de ventoline et c'est reglé !
          </Typography>
        </Grid2>
        <Grid2>
          <Typography>This is login page</Typography>
        </Grid2>
      </Grid2>
    </Container>
  );
}
