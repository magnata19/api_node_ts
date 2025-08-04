import { NextFunction, Request, Response, Router } from 'express';
import AuthController from '../controller/auth-controller';
import AuthService from '../service/auth-service';

const router: Router = Router();
const authController = new AuthController(new AuthService());

router.post("/login", (req: Request, res: Response, next: NextFunction) => authController.login(req, res, next));

export default router;