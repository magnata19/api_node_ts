import { Router } from "express";
import SegurancaController from "../controller/seguranca-controller";
import SegurancaService from "../service/seguranca-service";
import { authMiddleware } from "../middleware/auth-middleware";

const segurancaAclRouter = Router();
const segurancaController = new SegurancaController(new SegurancaService());

segurancaAclRouter
  .post('/seguranca/acl', authMiddleware, segurancaController.cadastrarAcl.bind(segurancaController))
  .post('/seguranca/role-permission', authMiddleware, segurancaController.createRolePermission.bind(segurancaController))
  .post('/seguranca/create-user-role/', authMiddleware, segurancaController.addRoleToUser.bind(segurancaController));


export default segurancaAclRouter;