"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    async createUser(req, res) {
        try {
            const { name, surname, email, password } = req.body;
            const user = await this.userService.createUser({ name, surname, email, password });
            res.status(201).json({ message: user.message });
        }
        catch (err) {
            res.status(404).json({ message: "Erro ao criar usuário." });
        }
    }
}
exports.default = UserController;
//# sourceMappingURL=user-controller.js.map