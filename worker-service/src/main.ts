import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { config } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3001;
  const host = process.env.RABBITMQ_HOST;
  const port = process.env.RABBITMQ_PORT;
  const user = process.env.RABBITMQ_USERNAME;
  const pass = process.env.RABBITMQ_PASSWORD;
  const url = `amqp://${user}:${pass}@${host}:${port}`;

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [url],
      queue: config.queues.userCreated,
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(PORT);
  console.log(`🚀 Worker server is running on port ${PORT}`);
}

bootstrap();
