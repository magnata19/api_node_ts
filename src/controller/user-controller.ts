import { NextFunction, Request, Response } from "express";
import UserService from "../service/user-service";
import { UserSchema } from "../validation/user-validation";
import { InvalidFieldsError } from "../errors/invalid-fields-error";
import { User } from "@prisma/client";
import { CustomRequest } from "../types/custom-request";

export default class UserController {

  constructor(private userService: UserService) { }

  async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = UserSchema.safeParse(req.body);
      if (!result.success) {
        const error = result.error.issues.map((err) => err.message);
        return next(new InvalidFieldsError(error as any, 422))
      }
      const user = await this.userService.createUser(result.data);
      res.status(201).json({ message: user.message });
    } catch (err) {
      next(err)
    }
  }

  async validateAccount(req: Request, res: Response, next: NextFunction): Promise<void> {

  }

  async getUsers(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const users = await this.userService.getUsers();
      res.status(200).json({ users, usuario_logado: req.user?.email });
    } catch (err) {
      next(err);
    }
  }

  async getUserById(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    const userId = req.params.id;
    const user = await this.userService.getUserById(userId!);
    if (!user) {
      res.status(404).json({ message: "Usuário não encontrado." });
    }
    res.status(200).json(user)
  }
}