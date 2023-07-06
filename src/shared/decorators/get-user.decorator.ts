import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../user/models/user.model';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    //  console.log(req);
    return req.user;
  },
);
