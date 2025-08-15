import { prismaClient } from "..";
import { EntityAlreadyExistsError } from "../errors/user-already-exists-error";
import { PermissionDto } from "../validation/permission-validation";

export default class PermissionService {

  async createPermission(data: PermissionDto): Promise<void> {
    const permission = await prismaClient.permission.findFirst({
      where: {
        name: data.name
      }
    })

    if (permission) {
      throw new EntityAlreadyExistsError(`Permissão com nome ${data.name} já existe.`);
    }
    await prismaClient.permission.create({
      data: {
        name: data.name,
        description: data.description ?? ''
      }
    })
  }
}