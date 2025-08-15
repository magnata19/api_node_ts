import { HttpException } from "./exception-root";

export class InvalidFieldsError extends HttpException {
  constructor(message: string, errorCode: number, errors?: any) {
    super(message, 422, errors);
    this.name = 'InvalidFieldsError';
  }
}