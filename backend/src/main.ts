import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:5173'
    ],
    //methods: ["GET", "POST"],
    credentials: true,
  });

  session({
    secret: 'NiIsInR5cCIgOiAiSldUIiwia2lkIi',
    resave: false,
    saveUninitialized: false,
  }),
  await app.listen(3000);
}
bootstrap();
