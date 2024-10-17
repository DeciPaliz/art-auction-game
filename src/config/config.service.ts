import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

interface ConfigEnvironmentVariables {
  MODE: string;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DB: string;
  JWT_SECRET: string;
}

@Injectable()
export class ConfigService extends NestConfigService<ConfigEnvironmentVariables> {
  constructor(internalConfig?: Record<string, any>) {
    super(internalConfig);

    console.log('running in ' + this.getOrThrow('MODE') + ' mode');
  }
  static game = {
    maxPlayersMax: 5,
    maxPlayersMin: 3,
    passwordLengthMax: 30,
    passwordLengthMin: 0,
  };

  static isDevelopment() {
    return process.env.MODE === 'development';
  }
}
