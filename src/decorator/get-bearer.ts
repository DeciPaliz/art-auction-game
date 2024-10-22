import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const GetBearer = createParamDecorator(
  (_: undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest() as Request;
    return (
      request.headers.authorization &&
      request.headers.authorization.split(' ')[1]
    );
  },
);
