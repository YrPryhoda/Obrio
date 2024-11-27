import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { IUser } from './user.interfaces';
import { UserDto } from './user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  all(
    @Query('limit') limit: number,
    @Query('page') page: number,
  ): Promise<IUser[]> {
    return this.userService.getAll(limit, page);
  }

  @Post()
  async create(@Body() userDto: UserDto): Promise<IUser> {
    return this.userService.create(userDto);
  }
}
