"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_validation_1 = require("../validation/user-validation");
const invalid_fields_error_1 = require("../errors/invalid-fields-error");
class UserController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    async createUser(req, res, next) {
        try {
            const result = user_validation_1.UserSchema.safeParse(req.body);
            if (!result.success) {
                const error = result.error.issues.map((err) => err.message);
                return next(new invalid_fields_error_1.InvalidFieldsError(error, 422));
            }
            const user = await this.userService.createUser(result.data);
            res.status(201).json({ message: user.message });
        }
        catch (err) {
            next(err);
        }
    }
    async getUsers(req, res, next) {
        try {
            const users = await this.userService.getUsers();
            res.status(200).json({ users, usuario_logado: req.user?.email });
        }
        catch (err) {
            next(err);
        }
    }
}
exports.default = UserController;
//# sourceMappingURL=user-controller.js.map