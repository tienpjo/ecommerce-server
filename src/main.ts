import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

declare const module: any;
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

  await app.listen(AppModule.port);
}
bootstrap();
