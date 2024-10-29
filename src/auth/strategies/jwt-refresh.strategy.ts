import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { ConfigService } from 'src/config/config.service';
import { UserService } from 'src/user/user.service';
import { extractRefreshToken } from '../util/refreshToken';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    config: ConfigService,
    private user: UserService,
  ) {
    super({
      jwtFromRequest: (req: Request) => {
        if (!req.headers.cookie) return null;
        return extractRefreshToken(req.headers.cookie);
      },
      secretOrKey: config.get('JWT_REFRESH_SECRET'),
    });
  }

  async validate(payload: any) {
    const user = this.user.findUser({ id: payload.sub });
    if (!user) throw new UnauthorizedException();

    return {
      attributes: user,
      refreshTokenExpiresAt: new Date(payload.exp * 1000),
    };
  }
}
