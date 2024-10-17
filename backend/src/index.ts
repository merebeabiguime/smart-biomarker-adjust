import express, { Express, Request, Response } from "express";
import biomarkerRouter from "./Routes/biomarkerRoutes";
import { API_ROUTES_NAME } from "./utils/consts";
import { NotificationServiceImp } from "./Services/NotificationServiceImp";
import { CorsOptions } from "cors";

const app: Express = express();
const port = 3000;
const corsOptions: CorsOptions = {
  origin: `${process.env.CORS_OPTIONS_ORIGIN || "*"}`,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Length", "X-Custom-Header"],
  credentials: true,
  optionsSuccessStatus: 204,
};
const notificationService = new NotificationServiceImp(corsOptions);

app.use(`${API_ROUTES_NAME}`, biomarkerRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});

const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

//Start notification service
notificationService.startListening(server);
