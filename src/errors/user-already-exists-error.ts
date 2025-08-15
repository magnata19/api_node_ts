import { HttpException } from "./exception-root";

export class EntityAlreadyExistsError extends HttpException {
  constructor(message: string, errors?: any) {
    super(message, 409, errors);
    this.name = 'EntityAlreadyExistsError';
  }
}