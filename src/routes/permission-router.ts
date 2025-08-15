import { NextFunction, Request, Response, Router } from "express";
import { PermissionController } from "../controller/permission-controller";
import PermissionService from "../service/permission-service";

const permissionRouter: Router = Router();
const permissionController = new PermissionController(new PermissionService());

permissionRouter.post('/create', async (req: Request, res: Response, next: NextFunction) => permissionController.createPermission(req, res, next));

export default permissionRouter;

