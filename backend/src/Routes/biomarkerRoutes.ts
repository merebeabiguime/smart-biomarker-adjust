import express from "express";
import { BIOMARKER_ROUTES_NAME } from "../utils/consts";
import { BiomarkerController } from "../Controllers/BiomarkerController";
import bodyParser from "body-parser";
import { notificationService } from "../utils/instantiation";
const router = express.Router();

router.use(bodyParser.json());

const biomarkerController = new BiomarkerController(notificationService);
router.post(
  `${BIOMARKER_ROUTES_NAME}/receive-data`,
  biomarkerController.receiveData.bind(biomarkerController)
);
export default router;
