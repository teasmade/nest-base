import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailConflictError extends HttpException {
  constructor() {
    super(
      "L'addresse mail fournie est déjà associée à un compte existant.",
      HttpStatus.CONFLICT,
    );
  }
}
