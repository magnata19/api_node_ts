import { NextFunction, Request, Response, Router } from "express";
import { RoleController } from "../controller/role-controller";
import { RoleService } from "../service/role-service";
import { authMiddleware } from "../middleware/auth-middleware";

const roleRouter = Router();
const roleController = new RoleController(new RoleService());

roleRouter.post('/create', authMiddleware, async (req: Request, res: Response, next: NextFunction) => await roleController.createRole(req, res, next));

export default roleRouter;