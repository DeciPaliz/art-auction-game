import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { extractRefreshToken } from 'src/auth/util/refreshToken';

export const GetRefreshToken = createParamDecorator(
  (_: undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest() as Request;
    const cookies = request.headers.cookie.split('; ');
    if (cookies.length === 0) return null;

    return (
      request.headers.cookie && extractRefreshToken(request.headers.cookie)
    );
  },
);
