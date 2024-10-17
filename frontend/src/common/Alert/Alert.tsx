import { Box, Grid2, Typography } from "@mui/material";
import { TAlertProps } from "./types/TAlertProps";

export default function Alert(props: TAlertProps) {
  return (
    <Box
      sx={{
        backgroundColor: props.backgroundColor,
        p: 2,
        boxShadow: " 0px 4px 6px rgba(0, 0, 0, 0.1)",
        minHeight: "75px",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        color: props.fontColor,
      }}
    >
      <Typography textAlign={"center"} sx={{ color: "white" }}>
        {props.message}
      </Typography>
    </Box>
  );
}
