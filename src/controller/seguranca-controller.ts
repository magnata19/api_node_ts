import { NextFunction, Request, Response } from "express";
import SegurancaService from "../service/seguranca-service";
import { CustomRequest } from "../types/custom-request";
import { User } from "@prisma/client";

export default class SegurancaController {

  constructor(private segurancaService: SegurancaService) { }

  async cadastrarAcl(req: CustomRequest, res: Response, next: NextFunction) {
    const user = req.user;
    const { role, permission } = req.body;

    try {
      const result = await this.segurancaService.createAcl(user?.id!, role, permission);
      res.status(201).json(result)
    } catch (err) {
      next(err)
    }
  }

  async createRolePermission(req: CustomRequest, res: Response, next: NextFunction) {
    const { roleId, permissionId } = req.body;
    try {
      const result = await this.segurancaService.createPermissionRole(roleId, permissionId);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
}