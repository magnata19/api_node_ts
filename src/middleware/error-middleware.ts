import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { HttpException } from "../errors/exception-root";

export const errorMiddleware: ErrorRequestHandler = (err: HttpException, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof HttpException) {
    res.status(err.statusCode).json({
      message: err.message,
      errorCode: err.statusCode
    })
  }

  console.log(err)

  res.status(500).json({
    message: "Internal Server Error",
    errorCode: 500
  })
}