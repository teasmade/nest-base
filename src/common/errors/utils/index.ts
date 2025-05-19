/**
 * Error handling utilities and types for the application.
 *
 * This barrel file exports:
 * - ErrorCode: Application-specific error codes enum
 * - throwCodedError: Utility function for throwing standardized errors
 * - HttpStatus: Re-exported from @nestjs/common for convenience
 *   Original source: import { HttpStatus } from '@nestjs/common'
 */

export { throwCodedError } from './coded-error';
export { ErrorCode } from '../enums/error-code.enum';
export { HttpStatus } from '@nestjs/common';
