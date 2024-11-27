import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
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
              queue: config.queues.userNotify,
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
