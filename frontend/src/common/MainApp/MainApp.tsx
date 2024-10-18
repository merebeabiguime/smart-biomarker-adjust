import { CircularProgress, Typography, Grid2 } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect } from "react";
import BreathingStatus from "../../modules/BreathingStatus/BreathingStatus";
import CrisisAlert from "../../modules/CrisisAlert/CrisisAlert";
import OxygenSaturation from "../../modules/OxygenSaturation/OxygenSaturation";
import NavBar from "../NavBar/NavBar";
import { useAppSelector } from "../store/redux";
import DoseAdministred from "../../modules/DoseAdministered/DoseAdministred";
import useNotificationRepository from "../Notification/useNotificationRepository";
import { Route, Routes } from "react-router";
import MainPage from "./MainPage";
import HistoryPage from "./HistoryPage";

export default function MainApp() {
  const { onInitializeNotification } = useNotificationRepository();
  const handleInitializeApp = async () => {
    await onInitializeNotification();
  };
  useEffect(() => {
    handleInitializeApp();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/history" element={<HistoryPage />} />
    </Routes>
  );
}
