import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class RefreshTokenService {
  private readonly logger = new Logger(RefreshTokenService.name);

  constructor(
    private config: ConfigService,
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async generateRefreshToken(
    userId: number,
    currentRefreshToken?: string,
    currentRefreshTokenExpiresAt?: Date,
  ) {
    if (
      currentRefreshToken &&
      (await this.isRefreshTokenBlacklisted(currentRefreshToken, userId))
    ) {
      throw new UnauthorizedException('invalid refresh token');
    }

    const token = this.jwt.sign(
      { sub: userId },
      { secret: this.config.get('JWT_REFRESH_SECRET'), expiresIn: '30d' },
    );

    if (currentRefreshToken && currentRefreshTokenExpiresAt) {
      await this.prisma.refreshToken.create({
        data: { token, expiresAt: currentRefreshTokenExpiresAt, userId },
      });
    }

    return token;
  }

  async isRefreshTokenBlacklisted(refreshToken: string, userId: number) {
    const token = await this.prisma.refreshToken.findFirst({
      where: { userId, token: refreshToken },
    });
    return token !== null;
  }

  async generatePair(
    user: User,
    currentRefreshToken?: string,
    currentRefreshTokenExpiresAt?: Date,
  ) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwt.sign(payload, {
        secret: this.config.get('JWT_SECRET'),
        expiresIn: '15m',
      }),
      refresh_token: await this.generateRefreshToken(
        user.id,
        currentRefreshToken,
        currentRefreshTokenExpiresAt,
      ),
    };
  }

  @Cron(CronExpression.EVERY_DAY_AT_6AM)
  async clearExpiredRefreshTokens() {
    this.logger.log('Clearing expired refresh tokens...');
    await this.prisma.refreshToken.deleteMany({
      where: { expiresAt: { lte: new Date() } },
    });
    this.logger.log('Expired refresh tokens cleared');
  }
}
