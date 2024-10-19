import express from "express";
import { BIOMARKER_ROUTES_NAME } from "../utils/consts";
import { BiomarkerController } from "../Controllers/Biomarker/BiomarkerController";
import bodyParser from "body-parser";
import { notificationService } from "../utils/instantiation";
import { BiomarkerMeasurementInteractor } from "../Interactor/BiomarkerMeasurementInteractor";
import { BiomarkerMeasurementRepositoryImp } from "../Repository/BiomarkerMeasurement/BiomarkerMeasurementRepositoryImp";
const router = express.Router();

router.use(bodyParser.json());
const biomarkerMeasurementRepository = new BiomarkerMeasurementRepositoryImp();
const biomarkerMeasurementInteractor = new BiomarkerMeasurementInteractor(
  biomarkerMeasurementRepository
);
const biomarkerController = new BiomarkerController(
  notificationService,
  biomarkerMeasurementInteractor
);
router.post(
  `${BIOMARKER_ROUTES_NAME}/receive-data`,
  biomarkerController.receiveData.bind(biomarkerController)
);
router.get(
  `${BIOMARKER_ROUTES_NAME}/find-all/:startDate/:endDate/:userId`,
  biomarkerController.findAllByDateAndUserId.bind(biomarkerController)
);
export default router;
