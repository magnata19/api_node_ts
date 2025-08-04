import { HttpException } from "./exception-root";

export class UserAlreadyExistsError extends HttpException {
  constructor(message: string, errorCode: number, errors?: any) {
    super(message, errorCode, 409, errors);
    this.name = 'UserAlreadyExistsError';
  }
}