import express from "express";
import { BIOMARKER_ROUTES_NAME } from "../utils/consts";
import { BiomarkerController } from "../Controllers/BiomarkerController";
import bodyParser from "body-parser";
const router = express.Router();

router.use(bodyParser.json());

const biomarkerController = new BiomarkerController();
router.post(
  `${BIOMARKER_ROUTES_NAME}/receive-data`,
  biomarkerController.receiveData.bind(biomarkerController)
);
export default router;
