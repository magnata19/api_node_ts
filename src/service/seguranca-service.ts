import id from "zod/v4/locales/id.js";
import { prismaClient } from "..";
import { EntityNotFound } from "../errors/entity-not-found";

export default class SegurancaService {

    async createAcl(userId: string, role: string[], permission: string[]): Promise<any> {
        const userData = await prismaClient.user.findUnique({
            where: {
                id: userId
            }
        })
        const roleData = await prismaClient.role.findMany({
            where: {
                id: {
                    in: role
                }
            }
        })
        const permissionData = await prismaClient.permission.findMany({
            where: {
                id: {
                    in: permission
                }
            }
        })
        if (!userData) throw new EntityNotFound("Usuário não encontrado");
        if (!roleData || roleData.length === 0) throw new EntityNotFound("Função não encontrada");
        if (!permissionData || permissionData.length === 0) throw new EntityNotFound("Permissão não encontrada");

        await Promise.all(
            roleData.flatMap(role =>
                permissionData.map(permission =>
                    prismaClient.userRolePermission.create({
                        data: {
                            userId,
                            permissionId: permission.id,
                            roleId: role.id
                        }
                    })
                )
            )
        )

        const newUser = await prismaClient.user.findUnique({
            where: {
                id: userId
            },
            include: {
                userPermission: {
                    include: {
                        permission: true,
                        Role: true
                    }
                }
            }
        })

        return newUser;

    }

    async createPermissionRole(roleId: string, permissions: string[]): Promise<any> {
        const roleData = await prismaClient.role.findFirst({
            where: {
                id: roleId
            }
        })

        const permissionsFound = await prismaClient.permission.findMany({
            where: {
                id: {
                    in: permissions
                }
            }
        })

        if (!roleData) throw new EntityNotFound("Função não encontrada");
        if (!permissionsFound || permissionsFound.length === 0) throw new EntityNotFound("Permissão não encontrada");

        await prismaClient.permissionRole.createMany({
            data: permissionsFound.map(permission => {
                return {
                    roleId,
                    permissionId: permission.id
                }
            })
        })

        const newRole = await prismaClient.role.findFirst({
            where: {
                id: roleId
            },
            include: {
                permissionRole: {
                    include: {
                        permission: true
                    }
                }
            }
        })

        return newRole;

    }
}