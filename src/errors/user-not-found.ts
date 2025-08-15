import { HttpException } from "./exception-root";

export class UserNotFoundException extends HttpException {
  constructor(message: string, statusCode: number, errors?: any) {
    super(message, statusCode, errors);
  }
}