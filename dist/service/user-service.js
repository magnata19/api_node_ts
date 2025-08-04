"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
class UserService {
    async createUser(data) {
        const user = await __1.prismaClient.user.create({
            data: {
                name: data.name,
                surname: data.surname,
                email: data.email,
                password: data.password
            }
        });
        return { message: "Usuário criado com sucesso!" };
    }
}
exports.default = UserService;
//# sourceMappingURL=user-service.js.map