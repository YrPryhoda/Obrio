import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { config } from '../../config';

const { tasks } = config;

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue(tasks.notify24hours.name) private readonly queue: Queue,
  ) {}

  async sendToQueue<T>(data: T): Promise<void> {
    await this.queue.add(tasks.notify24hours.job, data, {
      delay: tasks.notify24hours.delay,
    });
  }
}
