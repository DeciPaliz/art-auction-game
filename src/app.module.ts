import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { GameModule } from './game/game.module';
import { ConfigModule } from './config/config.module';
import * as path from 'node:path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'frontend', 'dist'),
    }),
    ConfigModule,
    UserModule,
    PrismaModule,
    AuthModule,
    GameModule,
  ],
})
export class AppModule {}
