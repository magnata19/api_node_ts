import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

import { verify, decode } from "jsonwebtoken";
import { CustomRequest } from "../types/custom-request";

export const authMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]; // a partir do espaço, pega o segundo elemento que é o token

  if (!token) {
    res.status(401).json({ message: "Token não foi fornecido." })
  }

  try {
    verify(token!, process.env.SECRECT_KEY as string);
    const { id, email } = decode(token!) as { id: string; email: string };
    (req as any).user = { id, email };
    return next();
  } catch (err) {
    res.status(401).json({ message: "Usuário não autorizado." })
  }
}