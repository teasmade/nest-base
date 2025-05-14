// src/common/exceptions/error-code-exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCode } from './enums/error-code.enum';

export default function throwCodedError(
  errorCode: ErrorCode,
  status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
  message?: string,
): never {
  throw new HttpException(
    {
      errorCode,
      message,
    },
    status,
  );
}
