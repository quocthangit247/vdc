import { NestFactory } from '@nestjs/core';
import { GrpcOptions, MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const microserviceOptions: GrpcOptions = {
    transport: Transport.GRPC,
    options: {
      url: 'localhost:34342',
      package: 'tracking',
      protoPath: join(__dirname, './tracking.proto'),
    },
  };

  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>(microserviceOptions);

  await app.startAllMicroservicesAsync();
  await app.listen(process.env.PORT || 3002);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap().then(() => {
  console.log('Service listening 👍:', process.env.PORT || 3001);
});
