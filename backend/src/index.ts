import express, { Express, Request, Response } from "express";
import biomarkerRouter from "./Routes/biomarkerRoutes";
import { API_ROUTES_NAME } from "./utils/consts";
import { notificationService } from "./utils/instantiation";

const app: Express = express();
const port = 3000;

app.use(`${API_ROUTES_NAME}`, biomarkerRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});

const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

//Start notification service
notificationService.startListening(server);

notificationService;
