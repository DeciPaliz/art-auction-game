import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import { readFileSync } from 'node:fs';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const options: NestApplicationOptions = {};
  if (!ConfigService.isDevelopment()) {
    options.httpsOptions = {
      key: readFileSync('./secret/key.pem'),
      cert: readFileSync('./secret/cert.pem'),
    };
  }
  const app = await NestFactory.create(AppModule, options);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors({ origin: true, credentials: true });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  new Logger('NestApplication').log(`Listening on port ${port}`);
}
bootstrap();
