"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controller/user-controller"));
const user_service_1 = __importDefault(require("../service/user-service"));
const userRouter = (0, express_1.Router)();
const userController = new user_controller_1.default(new user_service_1.default);
userRouter.post('/', async (req, res) => userController.createUser(req, res));
exports.default = userRouter;
//# sourceMappingURL=user-router.js.map