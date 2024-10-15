import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

interface ConfigEnvironmentVariables {
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DB: string;
  JWT_SECRET: string;
}

@Injectable()
export class ConfigService extends NestConfigService<ConfigEnvironmentVariables> {
  static game = {
    maxPlayersMax: 5,
    maxPlayersMin: 3,
    passwordLengthMax: 30,
    passwordLengthMin: 0,
  };
}
