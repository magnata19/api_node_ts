import * as bcrypt from 'bcryptjs';
import { prismaClient } from "..";

type UserDto = {
  name: string;
  surname: string;
  email: string;
  password: string;
  roleId: string;
}

export default class UserService {
  async createUser(data: UserDto): Promise<{ message: string }> {
    const hashedPassword = bcrypt.hashSync(data.password, 10);
    const user = await prismaClient.user.create({
      data: {
        name: data.name,
        surname: data.surname,
        email: data.email,
        password: hashedPassword
      }
    })
    return { message: "Usuário criado com sucesso!" };
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