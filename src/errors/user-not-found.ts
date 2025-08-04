import { HttpException } from "./exception-root";

export class UserNotFoundException extends HttpException {
  constructor(message: string, statusCode: number) {
    super(message, statusCode, 404, null);
  }
}