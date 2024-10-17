import express from "express";
import { BIOMARKER_ROUTES_NAME, USER_ROUTES_NAME } from "../utils/consts";
import { BiomarkerController } from "../Controllers/Biomarker/BiomarkerController";
import bodyParser from "body-parser";
import { notificationService } from "../utils/instantiation";
import { UserController } from "../Controllers/User/UserController";
import { UserInteractor } from "../Interactor/UserInteractor";
import { UserRepositoryImp } from "../Repository/User/UserRepositoryImp";
const router = express.Router();

router.use(bodyParser.json());

const userRepository = new UserRepositoryImp();
const userInteractor = new UserInteractor(userRepository);
const userController = new UserController(userInteractor);
router.post(
  `${USER_ROUTES_NAME}/create`,
  userController.create.bind(userController)
);
router.post(
  `${USER_ROUTES_NAME}/login/:email/:password`,
  userController.findByEmailAndPassword.bind(userController)
);
export default router;
