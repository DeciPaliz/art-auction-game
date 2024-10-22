import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { ConfigService } from 'src/config/config.service';
import { UserService } from 'src/user/user.service';

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
        const cookies = req.headers.cookie.split('; ');
        if (cookies.length === 0) return null;

        const refreshTokenCookie = cookies.find((cookie) =>
          cookie.startsWith(`${ConfigService.cookie.refresh.name}=`),
        );
        if (!refreshTokenCookie) return null;

        return refreshTokenCookie.split('=')[1];
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
