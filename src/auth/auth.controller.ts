import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthDto } from './auth.dto';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { GetUser } from 'src/decorator/get-user';
import { User } from '@prisma/client';
import { GetBearer } from 'src/decorator/get-bearer';
import { RefreshTokenService } from './refresh-token.service';
import { Response } from 'express';
import { ConfigService } from 'src/config/config.service';

@Controller('api/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private refreshToken: RefreshTokenService,
  ) {}

  @Post('sign-up')
  async signUp(
    @Res({ passthrough: true }) response: Response,
    @Body() dto: AuthDto,
  ) {
    const pair = await this.authService.signUp(dto);
    response.cookie(ConfigService.cookie.refresh.name, pair.refresh_token, {
      ...ConfigService.cookie.refresh.options,
    });
    return { access_token: pair.access_token };
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(
    @Res({ passthrough: true }) response: Response,
    @Body() dto: AuthDto,
  ) {
    const pair = await this.authService.signIn(dto);
    response.cookie(ConfigService.cookie.refresh.name, pair.refresh_token, {
      ...ConfigService.cookie.refresh.options,
    });
    return { access_token: pair.access_token };
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async refresh(
    @GetUser('attributes') attributes: User,
    @GetBearer() bearer: string,
    @GetUser('refreshTokenExpiresAt') refreshTokenExpiresAt: Date,
  ) {
    if (!attributes) throw new InternalServerErrorException();
    if (!bearer) throw new ForbiddenException('invalid credentials');
    return this.refreshToken.generatePair(
      attributes,
      bearer,
      refreshTokenExpiresAt,
    );
  }

  @Post('clear')
  async clear(@Res({ passthrough: true }) response: Response) {
    response.clearCookie(ConfigService.cookie.refresh.name);
  }
}
