import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import session from 'express-session';
import cors from 'cors';
import mongoose from 'mongoose';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const hostApp = `${AppModule.host}:${AppModule.port}`;
  const documentConfig = new DocumentBuilder()
    .setTitle('ECOMMERCE APP API')
    .setDescription('The ECOMMERCE API Description')
    .setVersion('1.0')
    .setBasePath('/api')
    .build();

  const documentSwagger = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('api/docs', app, documentSwagger, {
    swaggerUrl: `${hostApp}/api/docs-json`,
    explorer: true,
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const clientP: any = mongoose
    .connect(process.env.MONGO_URI, {})
    .then(m => m.connection.getClient());

  app.use(
    cors({
      credentials: true,
      origin: process.env.ORIGIN,
      methods: ['GET', 'POST', 'GET', 'HEAD', 'PUT', 'PATCH'],
    }),
  );

  app.use(cookieParser());
  app.use(
    session({
      cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000,
      },
      secret: process.env.COOKIE_KEY,
      resave: false,
      saveUninitialized: true,
      store: MongoStore.create({
        clientPromise: clientP,
        collectionName: 'sessionUser',
      }),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(AppModule.port);
}
bootstrap();
