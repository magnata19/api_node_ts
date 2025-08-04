import { Role } from "@prisma/client";
import { prismaClient } from "..";
import { InvalidFieldsError } from "../errors/invalid-fields-error";

export class RoleService {

  async createRole(data: Role): Promise<void> {
    const role = await prismaClient.role.findFirst({
      where: {
        id: data.id
      }
    })

    if (role) {
      throw new InvalidFieldsError(`Papel com nome ${data.name} já existe.`, 422);
    }

    await prismaClient.role.create({
      data: {
        ...data
      }
    })
  }
}