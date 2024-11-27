import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { AmqpModule } from '../../modules/amqp.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AmqpModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
