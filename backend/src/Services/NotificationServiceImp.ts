import cors from "cors";
import { Server as HttpServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { NotificationService } from "../Interfaces/NotificationService";
import { safeRemoveUnderscores } from "../utils/shared";
import { TsendNewMeasureNotification } from "./types/TsendNewMeasureNotification";

export enum NotificationEventType {
  MEASURE_NEW = "measure.new",
}

export class NotificationServiceImp implements NotificationService {
  private _io: SocketIOServer | null = null;
  private _corsOptions: cors.CorsOptions;

  constructor(corsOptions: cors.CorsOptions) {
    this._corsOptions = corsOptions;
  }

  startListening(httpServer: HttpServer): void {
    if (this._io) {
      throw new Error("Socket.IO server already initialized");
    }
    this._io = new SocketIOServer(httpServer, {
      cors: this._corsOptions,
    });
    this._io.on("connection", (socket) => {
      console.log("A client just connected to notification service.");

      socket.on("disconnect", () => {
        console.log("A client just disconnected from notification service.");
      });
    });
    console.log("Socket.IO server is now listening for connections");
  }

  async closeConnection(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this._io) {
        resolve();
        return;
      }

      this._io.close((err) => {
        if (err) {
          reject(err);
        } else {
          console.log("Socket.IO server closed");
          this._io = null;
          resolve();
        }
      });
    });
  }

  // Méthode pour envoyer une notification
  async sendIONotification(
    event: NotificationEventType,
    payload: any
  ): Promise<any> {
    if (!this._io) {
      throw new Error("Socket.IO server not initialized");
    }
    this._io.emit(event, safeRemoveUnderscores(payload));
  }

  async sendNewMeasureNotification(
    data: TsendNewMeasureNotification
  ): Promise<void> {
    await this.sendIONotification(NotificationEventType.MEASURE_NEW, data);
  }
}
