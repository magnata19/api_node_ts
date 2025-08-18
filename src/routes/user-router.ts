import { NextFunction, Request, Response, Router } from "express";
import UserController from "../controller/user-controller";
import UserService from "../service/user-service";
import { authMiddleware } from "../middleware/auth-middleware";

const userRouter = Router();
const userController = new UserController(new UserService());

userRouter.post('/create', async (req: Request, res: Response, next: NextFunction) => await userController.createUser(req, res, next));
userRouter.get('/', authMiddleware, async (req: Request, res: Response, next: NextFunction) => await userController.getUsers(req, res, next));
userRouter.get('/:id', userController.getUserById.bind(userController));

export default userRouter;