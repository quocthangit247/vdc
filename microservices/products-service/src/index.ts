import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as morgan from 'morgan';
import { AppModule } from './app/app.module';
import { ValidationPipe } from './app/validation.pipe';
import { grpcTrackingClientOption } from './config/tracking-client-option';

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
  // Services
  console.log('>>>>>>>>>>>>>>>>>>>', 'grpcTrackingClientOption', grpcTrackingClientOption);
  app.connectMicroservice(grpcTrackingClientOption);
  await app.startAllMicroservicesAsync();

  await app.listen(Number(process.env.PORT) || 3001);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap().then(() => {
  console.log('Service listening 👍:', process.env.PORT || 3001);
});
