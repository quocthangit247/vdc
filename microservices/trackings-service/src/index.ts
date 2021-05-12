import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as morgan from 'morgan';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Product Service')
    .setDescription('Product Service API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(new ValidationPipe());

  app.use(
    morgan(
      '[:date[iso]] :remote-addr HTTP/:http-version :method :url HTTP-Code: :status Size: :res[content-length] bytes - Response-time: :response-time ms',
    ),
  );

  await app.listen(process.env.PORT || 3002);
}

bootstrap().then(() => {
  console.log('Service listening 👍:', process.env.PORT || 3001);
});
