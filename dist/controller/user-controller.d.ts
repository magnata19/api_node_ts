import { NextFunction, Request, Response } from "express";
import UserService from "../service/user-service";
import { CustomRequest } from "../types/custom-request";
export default class UserController {
    private userService;
    constructor(userService: UserService);
    createUser(req: Request, res: Response, next: NextFunction): Promise<void>;
    getUsers(req: CustomRequest, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=user-controller.d.ts.map