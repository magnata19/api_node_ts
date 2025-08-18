import { Router } from "express"
import userRouter from "./user-router";
import authRouter from './authRoute';
import roleRouter from "./role-router";
import permissionRouter from "./permission-router";
import segurancaAclRouter from "./seguranca-acl-router";
import storeRouter from "./store-router";

const router = Router();
router.use('/auth', authRouter)
router.use('/users', userRouter)
router.use('/roles', roleRouter)
router.use('/permissions', permissionRouter)
router.use('/', segurancaAclRouter)
router.use('/stores', storeRouter)

export default router;