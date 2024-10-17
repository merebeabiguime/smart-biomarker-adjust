import React, { useEffect } from "react";
import { io } from "socket.io-client";
import { TsendNewMeasureNotification } from "./types/TsendNewMeasureNotification";
import useNotificationRepository from "./useNotificationRepository";
export enum NotificationEventType {
  MEASURE_NEW = "measure.new",
}

export default function useNotification() {
  const { onReceiveNotification } = useNotificationRepository();
  useEffect(() => {
    const apiURL = `${process.env.REACT_APP_API_URL}`;
    const socket = io(apiURL);
    console.log("REACT_APP_API_URL", process.env.REACT_APP_API_URL);

    // Initialize notification service
    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    // Handle all notification events in a single handler
    socket.onAny((eventType, payload) => {
      switch (eventType) {
        case NotificationEventType.MEASURE_NEW: {
          const response: TsendNewMeasureNotification = payload;
          console.log("new measure notification", response);
          onReceiveNotification(response);
          //onUpdateCartList(response);
          break;
        }
        default: {
          console.log("Unhandled event type:", eventType);
        }
      }
    });

    return () => {
      socket.disconnect();
      console.log("Disconnected from Socket.IO server");
    };
  }, []);
}
