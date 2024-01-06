import { Body } from '@nestjs/common';
import { Controller } from '@nestjs/common/decorators/core';
import { MessagePattern } from '@nestjs/microservices';

import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'login' })
  login(@Body() user: CreateUserDto): any {
    console.log(user)
    return this.authService.login(user);
  }
  @MessagePattern({ cmd: 'signup' })
  signup(@Body() user: CreateUserDto): any {
    return this.authService.signup(user);
  }
}
