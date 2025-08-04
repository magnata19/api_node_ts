import { Router } from "express"
import userRouter from "./user-router";
import authRouter from './authRoute';
import roleRouter from "./role-router";

const router = Router();
router.use('/auth', authRouter)
router.use('/users', userRouter)
router.use('/roles', roleRouter)

export default router;