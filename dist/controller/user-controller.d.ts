import { Request, Response } from "express";
import UserService from "../service/user-service";
export default class UserController {
    private userService;
    constructor(userService: UserService);
    createUser(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=user-controller.d.ts.map