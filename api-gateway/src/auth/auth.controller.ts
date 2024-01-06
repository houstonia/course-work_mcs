import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private client: ClientProxy) {}

  @Post('/login')
  login(@Body() userDto: CreateUserDto) {
    console.log(userDto)
    return this.client.send({ cmd: 'login' }, userDto);
  }
  @Post('/signup')
  signup(@Body() userDto: CreateUserDto) {
    return this.client.send({ cmd: 'signup' }, userDto);
  }
}
