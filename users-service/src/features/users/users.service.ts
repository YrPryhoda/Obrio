import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { config } from '../../config';
import { IUser } from './user.interfaces';
import { UserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(config.tokens.AmqpToken) private amqpClient: ClientProxy,
  ) {}

  getAll(limit: number = 10, page: number = 0): Promise<IUser[]> {
    return this.userRepository.find({
      take: limit,
      skip: page * limit,
    });
  }

  async create(userData: UserDto): Promise<IUser> {
    const newUser = this.userRepository.create(userData);
    const createdUser = await this.userRepository.save(newUser);
    this.amqpClient.emit(config.events.userCreated, createdUser);
    return createdUser;
  }
}
