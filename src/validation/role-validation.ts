import z from "zod";
import { Role } from "@prisma/client";

export const RoleSchema = z.object({
  name: z.string().trim().min(1, { message: "Nome do papel é obrigatório." }).max(50, { message: "Nome do papel não pode ter mais de 50 caracteres." }),
  description: z.optional(z.string().trim().max(255, { message: "Descrição não pode ter mais de 255 caracteres." }))
})

export type RoleDto = z.infer<typeof RoleSchema>