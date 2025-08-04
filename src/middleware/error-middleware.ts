import { NextFunction, Request, Response } from "express";
import { ErrorCode, HttpException } from "../errors/exception-root";
import * as z from 'zod';

export const errorMiddleware: any = (err: HttpException, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof HttpException) {
    res.status(err.statusCode).json({
      message: err.message,
      errorCode: err.errorCode
    })
  }
}