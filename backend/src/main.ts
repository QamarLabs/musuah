import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
      credentials: true,
    },
  });
  app.use(bodyParser.json({limit: '4mb'}));
  app.use(bodyParser.urlencoded({limit: '4mb', extended: true}));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
