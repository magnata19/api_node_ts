import * as z from 'zod';
import { User } from "@prisma/client";

export const UserSchema = z.object({
  name: z.string().trim().min(1, { message: "Nome precisa ter pelo menos 1 caractere." }).max(255, { message: "Nome não pode ter mais de 255 caracteres." }),
  surname: z.string().trim().min(1, { message: "Sobrenome precisa ter pelo menos 1 caractere." }).max(255, { message: "Sobrenome não pode ter mais de 255 caracteres." }),
  email: z.string({ message: "Email é obrigatório." }).max(255),
  password: z.string({ message: "Senha é obrigatória." }).min(6).max(255),
  roleId: z.string()
})

export interface UserDto extends User { }