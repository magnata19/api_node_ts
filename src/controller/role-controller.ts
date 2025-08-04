import { NextFunction, Request, Response } from "express";
import { RoleService } from "../service/role-service";
import { RoleSchema } from "../validation/role-validation";
import { InvalidFieldsError } from "../errors/invalid-fields-error";

export class RoleController {
  constructor(private roleService: RoleService) { }

  async createRole(req: Request, res: Response, next: NextFunction) {
    const role = RoleSchema.safeParse(req.body);
    if (!role.success) {
      const error = role.error.issues.map((err) => err.message);
      return next(new InvalidFieldsError(error as any, 422));
    }
    try {
      const createdRole = await this.roleService.createRole(role.data as any);
      res.status(201).json({ message: "Papel criado com sucesso.", role: createdRole });
    } catch (err) {
      next(err);
    }
  }
}