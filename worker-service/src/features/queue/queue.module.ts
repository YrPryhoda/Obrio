import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';

import { MessageService } from '../../common/providers/message.service';
import { AmqpModule } from '../../modules/amqp.module';
import { QueueProcessor } from './queue.processor';
import { QueueService } from './queue.service';
import { config } from '../../config';

@Module({
  imports: [
    AmqpModule,
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    }),
    BullModule.registerQueue({
      name: config.tasks.notify24hours.name,
    }),
  ],
  providers: [QueueService, QueueProcessor, MessageService],
  exports: [QueueService],
})
export class QueueModule {}
