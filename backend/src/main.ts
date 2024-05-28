import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as session from 'express-session';
import {HttpExceptionFilter} from './app/http.exception.filter'
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors({
    origin: [
      'http://localhost:5173'
    ],
    //methods: ["GET", "POST"],
    credentials: true,
  });

  session({
    secret: 'nU2HMWe1rosvOmts1KrYMYZTlFruhXSY',
    resave: false,
    saveUninitialized: false,
  }),
  await app.listen(3000);
}
bootstrap();
