import z from "zod";
import { Permission } from "@prisma/client";

export const PermissionSchema = z.object({
  name: z.string().trim().min(1, { message: "Nome é obrigatório" }).max(50, { message: "Nome deve ter no máximo 50 caracteres" }),
  description: z.string().max(255, { message: "Descrição deve ter no máximo 255 caracteres" }).trim().optional(),
})

export type PermissionDto = z.infer<typeof PermissionSchema>;