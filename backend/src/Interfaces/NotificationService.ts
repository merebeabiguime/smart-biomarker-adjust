import { Server as HttpServer } from "http";
export interface NotificationService {
  startListening(httpServer: HttpServer): void;
  closeConnection(): Promise<void>;
  sendIONotification(event: string, payload: any): void;
}
