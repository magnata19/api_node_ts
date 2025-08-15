import { HttpException } from "./exception-root";

export class EntityNotFound extends HttpException {
  constructor(message: string, statusCode: number = 404, error?: any) {
    super(message, statusCode, error);
    this.name = "EntityNotFound";
  }
}