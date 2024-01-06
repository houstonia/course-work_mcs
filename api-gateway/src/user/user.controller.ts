import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}

  @Post()
  createUser(@Body() userDto: CreateUserDto) {
    return this.client.send({ cmd: 'create_user' }, userDto);
  }

  @Get()
  getAll() {
    return this.client.send({ cmd: 'get_all' }, '');
  }
  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.client.send({ cmd: 'get_user_by_id' }, id);
  }
  @Get('/email/:email')
  getUserByEmail(@Param('email') email: string) {
    return this.client.send({ cmd: 'get_user_by_email' }, { email });
  }
}
