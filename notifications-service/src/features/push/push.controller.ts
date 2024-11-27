import { EventPattern, Payload } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';

import { IMessageData } from './push.interfaces';
import { PushService } from './push.service';
import { config } from '../../config';
@Controller()
export class PushController {
  constructor(private readonly pushService: PushService) {}

  @EventPattern(config.events.userNotify)
  notification(@Payload() messageData: IMessageData) {
    return this.pushService.send(messageData);
  }
}
