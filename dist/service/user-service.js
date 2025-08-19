"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = __importStar(require("bcryptjs"));
const __1 = require("..");
const nodemailer_1 = __importDefault(require("nodemailer"));
const crypto_1 = __importDefault(require("crypto"));
class UserService {
    async createUser(data) {
        const hashedPassword = bcrypt.hashSync(data.password, 10);
        const email_host = 'isadora-pescador@tuamaeaquelaursa.com';
        const confirmCode = crypto_1.default.randomBytes(8).toString('hex');
        const user = await __1.prismaClient.user.create({
            data: {
                name: data.name,
                surname: data.surname,
                email: data.email,
                password: hashedPassword
            }
        });
        const transporter = nodemailer_1.default.createTransport({
            host: email_host,
            port: 587,
            secure: false,
            auth: {
                user: data.email,
                pass: data.password
            }
        });
        const mailOptions = {
            from: data.email,
            to: email_host,
            subject: 'Código para confirmação de conta',
            text: `Seu código de confirmação é: ${confirmCode}`
        };
        await transporter.sendMail(mailOptions);
        await __1.prismaClient.user.update({
            where: {
                id: user.id
            },
            data: {
                confirmCode
            }
        });
        return { message: "Usuário criado com sucesso!" };
    }
    async getUsers() {
        return await __1.prismaClient.user.findMany();
    }
    async getUserById(id) {
        return await __1.prismaClient.user.findFirst({
            where: {
                id
            },
            include: {
                userPermission: {
                    include: {
                        Role: true,
                        permission: true
                    }
                }
            }
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=user-service.js.map