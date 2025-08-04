import { NextFunction, Request, Response } from "express";
import AuthService from "../service/auth-service";

export default class AuthController {
  constructor(private authService: AuthService) {
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    try {
      const token = await this.authService.login({ email, password });
      res.status(200).send(token)
    } catch (err) {
      next(err);
    }
  }
}