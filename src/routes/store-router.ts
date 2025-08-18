import { Router } from "express";
import router from ".";
import StoreController from "../controller/store-controller";
import StoreService from "../service/store-service";
import { authMiddleware } from "../middleware/auth-middleware";
import { roleMiddleware } from "../middleware/middleware-role";

const storeRouter = Router();
const storeController = new StoreController(new StoreService());

storeRouter.post('/create', authMiddleware, roleMiddleware(["admin"]), storeController.createStore.bind(storeController));

export default storeRouter;