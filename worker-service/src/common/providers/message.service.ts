import { Injectable } from '@nestjs/common';
import { IUserData } from '../interfaces/user.interfaces';

@Injectable()
export class MessageService {
  createWelcomeMessage(userData: IUserData) {
    return {
      to: userData.id,
      notification: {
        title: `Greeting ${userData.name}`,
        body: 'Thanks for choosing our product',
      },
    };
  }
}
