import { Processor, WorkerHost } from '@nestjs/bullmq';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { Job } from 'bullmq';

import { MessageService } from '../../common/providers/message.service';
import { IUserData } from '../../common/interfaces/user.interfaces';
import { config } from '../../config';

const { tasks, events, tokens } = config;

@Processor(tasks.notify24hours.name)
export class QueueProcessor extends WorkerHost {
  constructor(
    @Inject(tokens.AmqpToken) private queue: ClientProxy,
    private readonly messageService: MessageService,
  ) {
    super();
  }

  async process(job: Job<IUserData>): Promise<void> {
    if (job.name === tasks.notify24hours.job) {
      const message = this.messageService.createWelcomeMessage(job.data);
      this.queue.emit(events.userNotify, message);
    }
  }
}
