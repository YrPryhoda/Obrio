import { Injectable } from '@nestjs/common';
import { IUserData } from '../../common/interfaces/user.interfaces';
import { QueueService } from '../queue/queue.service';

@Injectable()
export class WorkerService {
  constructor(private readonly queueService: QueueService) {}

  async commitUser(user: IUserData) {
    this.queueService.sendToQueue(user);
  }
}
