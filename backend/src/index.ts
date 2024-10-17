import express, { Express, Request, Response } from "express";
import biomarkerRouter from "./Routes/biomarkerRoutes";
import { API_ROUTES_NAME } from "./utils/consts";

const app: Express = express();
const port = 3000;

app.use(`${API_ROUTES_NAME}`, biomarkerRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
