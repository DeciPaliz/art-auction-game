import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { GameModule } from './game/game.module';
import { ConfigModule } from './config/config.module';
import { ServerModule } from './server/server.module';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    PrismaModule,
    AuthModule,
    GameModule,
  ].concat(process.env.API_REAL_URL ? [] : [ServerModule]),
})
export class AppModule {}
