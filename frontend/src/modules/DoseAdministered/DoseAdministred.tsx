import { Grid2, Typography } from "@mui/material";
import React from "react";
import useBiomarker from "../../common/hooks/useBiomarker";

export default function DoseAdministred() {
  const { onGetRecomendedDosage } = useBiomarker();
  const recomandedDosage = onGetRecomendedDosage();
  return (
    <Grid2 container justifyContent={"center"} mt={4}>
      <Grid2>
        <Typography>
          Dose d'administration recommandée :
          <span style={{ fontWeight: "bold" }}> {recomandedDosage} mg</span>
        </Typography>
      </Grid2>
    </Grid2>
  );
}
