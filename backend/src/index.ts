import express, { Express, Request, Response } from "express";
import biomarkerRouter from "./Routes/biomarkerRoutes";
import cors from "cors";
import { API_ROUTES_NAME } from "./utils/consts";
import { corsOptions, notificationService } from "./utils/instantiation";
import sequelize from "./Sequelize/models/index";

const app: Express = express();
const port = 3000;

app.use(cors(corsOptions));
app.use(`${API_ROUTES_NAME}`, biomarkerRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});

const startServer = async () => {
  const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });

  //Start notification service
  notificationService.startListening(server);

  //Authenticate on sequelize
  await sequelize.authenticate();
};

//Start server
startServer();
