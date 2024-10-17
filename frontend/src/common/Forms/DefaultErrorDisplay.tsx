import React, { useEffect, useState } from "react";
import { Collapse, Grid } from "@mui/material";
import { TDefaultErrorDisplayProps } from "./types/TDefaultErrorDisplayProps";
import ErrorBox from "./ErrorBox";
import ErrorMessage from "./ErrorMessage";

// Default error display
const DefaultErrorDisplay = (props: TDefaultErrorDisplayProps) => {
  const [open, setOpen] = useState(false);

  const hasErrors =
    !!props.formState?.error ||
    Object.keys(props.formState?.fieldErrors || {}).length > 0;

  useEffect(() => {
    if (hasErrors) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [!!hasErrors]);

  useEffect(() => {}, [JSON.stringify(props.formState)]);

  return (
    <>
      {props.collapse ? (
        <>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Grid item mb={4} width={"350px"} height={"100px"}>
              <ErrorBox>
                {props.formState?.error && (
                  <ErrorMessage message={props.formState.error} />
                )}
                {Object.entries(props.formState?.fieldErrors || {}).map(
                  ([key, message]) => (
                    <ErrorMessage key={key} message={message} />
                  )
                )}
              </ErrorBox>
            </Grid>
          </Collapse>
        </>
      ) : (
        <>
          <Grid item mb={4} width={"350px"} height={"100px"}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Grid item mb={4} width={"350px"} height={"100px"}>
                <ErrorBox>
                  {props.formState?.error && (
                    <ErrorMessage message={props.formState.error} />
                  )}
                  {Object.entries(props.formState?.fieldErrors || {}).map(
                    ([key, message]) => (
                      <ErrorMessage key={key} message={message} />
                    )
                  )}
                </ErrorBox>
              </Grid>
            </Collapse>
          </Grid>
        </>
      )}
    </>
  );
};

export default DefaultErrorDisplay;
