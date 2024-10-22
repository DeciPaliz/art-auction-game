import { Injectable, Logger } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

interface ConfigEnvironmentVariables {
  MODE: string;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DB: string;
  JWT_SECRET: string;
  JWT_REFRESH_SECRET: string;
}

@Injectable()
export class ConfigService extends NestConfigService<ConfigEnvironmentVariables> {
  private readonly logger = new Logger(ConfigService.name);

  constructor(internalConfig?: Record<string, any>) {
    super(internalConfig);

    this.logger.log('Running in ' + this.getOrThrow('MODE') + ' mode');
  }
  static game = {
    maxPlayersMax: 5,
    maxPlayersMin: 3,
    passwordLengthMax: 30,
    passwordLengthMin: 0,
  };

  static cookie = {
    refresh: {
      name: 'refresh_token',
      options: {
        path: '/',
        httpOnly: true,
        sameSite: 'strict' as const,
        secure: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      },
    },
  };

  static isDevelopment() {
    return process.env.MODE === 'development';
  }
}
