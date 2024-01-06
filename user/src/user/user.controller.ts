import { Body, Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { CreateUserDto } from './dto/create-user.dto';
import { EmailDto } from './dto/email.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @MessagePattern({ cmd: 'create_user' })
  createUser(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @MessagePattern({ cmd: 'get_user_by_email' })
  getUserByEmail(email: EmailDto) {
    return this.userService.getUserByEmail(email);
  }

  @MessagePattern({ cmd: 'get_all' })
  getAll() {
    return this.userService.getAllUsers();
  }
  @MessagePattern({ cmd: 'get_user_by_id' })
  getUserById(id: number) {
    return this.userService.getUserById(id);
  }
}
