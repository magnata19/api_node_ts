import * as bcrypt from 'bcryptjs';
import { prismaClient } from "..";
import nodemailer from 'nodemailer'
import crypto from 'crypto';
import { HttpException } from '../errors/exception-root';
import { EntityNotFound } from '../errors/entity-not-found';
import { CONFIRM_ACCOUNT_TEMPLATE } from '../templates/confirm-account-template';

type UserDto = {
  name: string;
  surname: string;
  email: string;
  password: string;
  roleId: string;
}

export default class UserService {
  async createUser(data: UserDto): Promise<{ message: string }> {
    try {
      const hashedPassword = bcrypt.hashSync(data.password, 10);
      const confirmCode = crypto.randomBytes(8).toString('hex');
      const user = await prismaClient.user.create({
        data: {
          name: data.name,
          surname: data.surname,
          email: data.email,
          password: hashedPassword,
          confirmCode
        }
      })

      const transporter = nodemailer.createTransport({
        host: process.env.HOST_MAIL_SERVICE,
        port: 587,
        secure: false,
        auth: {
          user: process.env.USER_MAIL_SERVICE,
          pass: process.env.TOKEN_MAIL_SERVICE
        }
      })

      const mailOptions = {
        from: 'hello@demomailtrap.co',
        to: data.email,
        subject: 'Código para confirmação de conta',
        html: CONFIRM_ACCOUNT_TEMPLATE.replace('{confirmCode}', confirmCode)
          .replace('{name}', data.name)
          .replace('{surname}', data.surname)
      }

      await transporter.sendMail(mailOptions)

      return { message: "Usuário criado com sucesso, por favor confirme sua conta." };
    } catch (err) {
      throw new HttpException("Erro ao criar usuário", 400, err);
    }
  }

  async validateAccount(id: string, token: string) {
    const user = await prismaClient.user.findFirst({
      where: {
        id
      }
    })
    if (!user) {
      throw new EntityNotFound("Usuário não encontrado");
    }

    if (user.confirmCode === token && user.confirmed == false) {
      await prismaClient.user.update({
        where: {
          id
        },
        data: {
          confirmed: true
        }
      })
      return { message: "Conta confirmada com sucesso." }
    }

    return { message: "Não foi possível confirmar sua conta, tente novamente." }
  }

  async getUsers(): Promise<any[]> {
    return await prismaClient.user.findMany();
  }

  async getUserById(id: string): Promise<any> {
    return await prismaClient.user.findFirst({
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
    })
  }
}