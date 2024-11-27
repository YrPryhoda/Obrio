import { ClientsModule, Transport } from '@nestjs/microservices';
import { Module } from '@nestjs/common';
import { config } from '../config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: config.tokens.AmqpToken,
        useFactory: () => {
          const host = process.env.RABBITMQ_HOST;
          const port = process.env.RABBITMQ_PORT;
          const user = process.env.RABBITMQ_USERNAME;
          const pass = process.env.RABBITMQ_PASSWORD;
          const url = `amqp://${user}:${pass}@${host}:${port}`;
          return {
            transport: Transport.RMQ,
            options: {
              reconnect: true,
              urls: [url],
              queue: config.queue.userCreated,
              queueOptions: {
                durable: true,
              },
            },
          };
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class AmqpModule {}
