"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controller/user-controller"));
const user_service_1 = __importDefault(require("../service/user-service"));
const auth_middleware_1 = require("../middleware/auth-middleware");
const userRouter = (0, express_1.Router)();
const userController = new user_controller_1.default(new user_service_1.default());
userRouter.post('/create', async (req, res, next) => await userController.createUser(req, res, next));
userRouter.get('/', auth_middleware_1.authMiddleware, async (req, res, next) => await userController.getUsers(req, res, next));
userRouter.get('/:id', userController.getUserById.bind(userController));
exports.default = userRouter;
//# sourceMappingURL=user-router.js.map