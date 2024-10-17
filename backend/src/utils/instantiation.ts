import { CorsOptions } from "cors";
import { NotificationServiceImp } from "../Services/NotificationServiceImp";

export const corsOptions: CorsOptions = {
  origin: `${process.env.CORS_OPTIONS_ORIGIN ?? "*"}`,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Length", "X-Custom-Header"],
  credentials: true,
  optionsSuccessStatus: 204,
};
export const notificationService = new NotificationServiceImp(corsOptions);
