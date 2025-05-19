// src/common/exceptions/error-code-exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCode } from '../enums/error-code.enum';

/**
 * Throws an HTTP exception with a standardized error code and optional message
 * @param errorCode - Error Code from the ErrorCode enum
 * @param status - HTTP Status from the @nestjs/common/HttpStatus enum
 * @param message - Optional error message string
 * @throws {HttpException} Always throws with error code and message
 */

export function throwCodedError(
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
