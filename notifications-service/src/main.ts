import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { config } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const host = process.env.RABBITMQ_HOST;
  const port = process.env.RABBITMQ_PORT;
  const user = process.env.RABBITMQ_USERNAME;
  const pass = process.env.RABBITMQ_PASSWORD;
  const url = `amqp://${user}:${pass}@${host}:${port}`;

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [url],
      queue: config.queue.userNotify,
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.startAllMicroservices();
  console.log('🚀 Notifications service is running');
}

bootstrap();
