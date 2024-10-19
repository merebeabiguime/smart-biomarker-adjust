import bodyParser from "body-parser";
import express from "express";
import { UserController } from "../Controllers/User/UserController";
import { UserInteractor } from "../Interactor/UserInteractor";
import { UserRepositoryImp } from "../Repository/User/UserRepositoryImp";
import { USER_ROUTES_NAME } from "../utils/consts";
const router = express.Router();

router.use(bodyParser.json());

const userRepository = new UserRepositoryImp();
const userInteractor = new UserInteractor(userRepository);
const userController = new UserController(userInteractor);
router.post(
  `${USER_ROUTES_NAME}/create`,
  userController.create.bind(userController)
);
router.get(
  `${USER_ROUTES_NAME}/login/:email/:password`,
  userController.findByEmailAndPassword.bind(userController)
);
export default router;
