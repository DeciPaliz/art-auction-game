import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const QuerySwitch = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req: Request = ctx.switchToHttp().getRequest();
    if (!req.query) return false;
    return req.query[data] !== undefined;
  },
);
