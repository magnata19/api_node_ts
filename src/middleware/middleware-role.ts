import { NextFunction, Response } from "express"
import { CustomRequest } from "../types/custom-request"
import { prismaClient } from "..";

export const roleMiddleware = (listaRoles: string[]) => {
  return async (req: CustomRequest, res: Response, next: NextFunction) => {
    const user = req.user;

    const userFound = await prismaClient.user.findFirst({
      where: {
        id: user?.id!
      },
      include: {
        userPermission: {
          include: {
            Role: true
          }
        }
      }
    })

    if (!userFound) {
      return res.status(404).json({ message: "Usuário não encontrado." })
    }

    const userRoles = userFound.userPermission.map(up => up.Role.name.toLocaleLowerCase());
    console.log("User Roles: ", userRoles)

    const hasRoles = listaRoles.some(role => userRoles.includes(role.toLocaleLowerCase()));

    if (!hasRoles) {
      return res.status(401).json({ message: "Usuário não tem permissão para efetuar essa ação." })
    }

    return next()
  }
}