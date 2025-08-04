import { prismaClient } from "..";
import { UserNotFoundException } from "../errors/user-not-found";
import * as bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';

type AuthDto = {
  email: string;
  password: string;
}

export default class AuthService {

  async login(dto: AuthDto): Promise<{ accessToken: string }> {
    const user = await prismaClient.user.findFirst({
      where: {
        email: dto.email
      }
    })
    if (!user) {
      throw new UserNotFoundException(`Usuário ${dto.email} não encontrado`, 404);
    }
    const passwordMatch = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatch) {
      throw new UserNotFoundException(`Senha incorreta para o usuário ${dto.email}`, 401);
    }

    const accessToken = sign({
      id: user.id,
      email: user.email
    }, process.env.SECRECT_KEY as string, {
      expiresIn: '3600s'
    })

    return { accessToken };
  }

}