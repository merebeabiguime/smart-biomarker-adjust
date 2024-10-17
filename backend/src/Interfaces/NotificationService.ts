import { Server as HttpServer } from "http";
import { TsendNewMeasureNotification } from "../Services/types/TsendNewMeasureNotification";
export interface NotificationService {
  startListening(httpServer: HttpServer): void;
  closeConnection(): Promise<void>;
  sendIONotification(event: string, payload: any): Promise<any>;
  sendNewMeasureNotification(data: TsendNewMeasureNotification): Promise<void>;
}
