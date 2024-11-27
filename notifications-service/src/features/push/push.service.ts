import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

import { IMessageData } from './push.interfaces';
import { config } from '../../config';

@Injectable()
export class PushService {
  readonly API: string;

  constructor(private readonly httpService: HttpService) {
    this.API = config.api.WEBHOOK_API;
  }

  async send(messageData: IMessageData) {
    const response = await lastValueFrom(
      this.httpService.post(this.API, messageData),
    );

    console.log(`Status:${response.statusText} for Sender:${messageData.to}`);
  }
}
