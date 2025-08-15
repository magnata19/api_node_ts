import { Role } from "@prisma/client";
import { prismaClient } from "..";
import { InvalidFieldsError } from "../errors/invalid-fields-error";

export class RoleService {

  async createRole(data: Role): Promise<void> {
    const role = await prismaClient.role.findFirst({
      where: {
        name: data.name
      }
    })

    if (!role) {
      await prismaClient.role.create({
        data: {
          ...data
        }
      })
    } else {

      throw new InvalidFieldsError(`Papel com nome ${data.name} já existe.`, 422);
    }

  }
}