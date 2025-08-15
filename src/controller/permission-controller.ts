import { NextFunction, Request, Response } from "express";
import PermissionService from "../service/permission-service";
import { PermissionSchema } from "../validation/permission-validation";
import { InvalidFieldsError } from "../errors/invalid-fields-error";

export class PermissionController {
  constructor(private permissionService: PermissionService) { }

  async createPermission(req: Request, res: Response, next: NextFunction): Promise<void> {
    const result = PermissionSchema.safeParse(req.body);
    if (!result.success) {
      const error = result.error.issues.map((err) => err.message);
      return next(new InvalidFieldsError(error as any, 422))
    }
    try {
      await this.permissionService.createPermission(result.data!);
      res.status(201).json({ message: "Permissão criada com sucesso!" });
    } catch (err) {
      next(err)
    }

  }
}