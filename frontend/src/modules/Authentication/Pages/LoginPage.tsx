import { Button, Grid, Grid2, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import CustomTextField from "../../../common/components/Fields/CustomTextField";

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const methods = useForm<LoginFormInputs>();

  const submitHandler: SubmitHandler<LoginFormInputs> = (data) => {
    console.log(data);
  };

  return (
    <Container>
      <Grid container justifyContent={"center"}>
        <Grid item mt={4}>
          <Typography
            sx={{ fontSize: "24px", fontWeight: "bold", textAlign: "center" }}
          >
            Wow : un coup de ventoline et c'est reglé !
          </Typography>
        </Grid>
      </Grid>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(submitHandler)}>
          <Grid2 container justifyContent="center" mb={2} mt={10}>
            <Grid item width={"80%"}>
              <CustomTextField
                name="email"
                label="Email"
                validation={{ required: "Veuillez entrer une adresse email" }}
              />
            </Grid>
          </Grid2>
          <Grid2 container justifyContent="center" mb={4}>
            <Grid item width={"80%"}>
              <CustomTextField
                name="password"
                label="Mot de passe"
                validation={{ required: "Veuillez entrer un mot de passe" }}
                password={true}
              />
            </Grid>
          </Grid2>
          <Grid2 container mb={2} justifyContent={"center"}>
            <Button
              type="submit"
              sx={{
                backgroundColor: "#1769aa",
                color: "white",
                textTransform: "none",
                width: "65%",
                borderRadius: "18px",
                fontWeight: "bold",
              }}
            >
              Connexion
            </Button>
          </Grid2>
        </form>
      </FormProvider>
    </Container>
  );
}
