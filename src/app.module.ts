import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { GameModule } from './game/game.module';
import { ConfigModule } from './config/config.module';
import { ServerModule } from './server/server.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    PrismaModule,
    AuthModule,
    GameModule,
    ScheduleModule.forRoot(),
  ].concat(process.env.API_REAL_URL ? [] : [ServerModule]),
})
export class AppModule {}
