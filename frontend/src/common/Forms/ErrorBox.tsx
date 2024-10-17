import React, { ReactNode } from "react";
import { Box } from "@mui/material";

export type TErrorBoxProps = {
  children: ReactNode;
};

const ErrorBox = (props: TErrorBoxProps) => {
  return (
    <Box
      sx={{
        maxWidth: 350,
        maxHeight: 350,
        width: "100%",
        height: "100%",
        overflow: "auto",
        backgroundColor: "white",
        boxShadow: "0px 10px 60px rgba(226, 236, 249, 0.5)",
        padding: 2,
      }}
    >
      {props.children}
    </Box>
  );
};

export default ErrorBox;
