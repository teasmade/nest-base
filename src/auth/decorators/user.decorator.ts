import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthReq } from '../interfaces/auth-req.interface';
import { AuthUser } from '../interfaces/auth-user.interface';

/**
 * Decorator to provide the authenticated user from the request
 * @returns The currently authenticated AuthUser object
 */
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<AuthReq>();
    const user: AuthUser = request.user;
    return user;
  },
);
