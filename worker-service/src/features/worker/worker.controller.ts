import { EventPattern, Payload } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';

import { IUserData } from '../../common/interfaces/user.interfaces';
import { WorkerService } from './worker.service';
import { config } from '../../config';

@Controller()
export class WorkerController {
  constructor(private readonly appService: WorkerService) {}

  @EventPattern(config.events.userCreated)
  userCreated(@Payload() data: IUserData) {
    const userData = { id: data.id, name: data.name };
    return this.appService.commitUser(userData);
  }
}
