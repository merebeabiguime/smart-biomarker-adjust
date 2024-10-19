import cors from "cors";
import express, { Express, NextFunction, Request, Response } from "express";
import { errorHandler } from "./Middlewares/ErrorHandler";
import biomarkerRouter from "./Routes/biomarkerRoutes";
import userRouter from "./Routes/userRoutes";
import sequelize from "./Sequelize/models/index";
import { API_ROUTES_NAME } from "./utils/consts";
import { corsOptions, notificationService } from "./utils/instantiation";

const app: Express = express();
const port = 3000;

app.use(cors(corsOptions));
app.use(`${API_ROUTES_NAME}`, biomarkerRouter);
app.use(`${API_ROUTES_NAME}`, userRouter);
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
});

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
