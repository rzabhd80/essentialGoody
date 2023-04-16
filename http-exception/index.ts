import { HttpException, HttpStatus } from "@nestjs/common";

export interface ICustomError {
  status: number,
  description: string
}

export class CustomError extends HttpException {
  constructor({ description, status }: ICustomError) {
    super(description, status);
  }
}

export const USER_WITH_GIVEN_EMAIL_EXISTS: ICustomError = {
  status: HttpStatus.BAD_REQUEST,
  description: "user with this email exists",
};
export const USER_NOT_FOUND: ICustomError = {
  status: HttpStatus.NOT_FOUND,
  description: "user not found",
};
export const INCORRECT_PASSWORD: ICustomError = {
  status: HttpStatus.BAD_REQUEST,
  description: "given password is wrong",
};