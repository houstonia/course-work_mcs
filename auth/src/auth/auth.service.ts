import * as bcrypt from 'bcryptjs';
import {
  HttpException,
  HttpStatus,
  Injectable,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    console.log(userDto)
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await lastValueFrom(
      this.userServiceClient.send(
        { cmd: 'get_user_by_email' },
        { email: userDto.email },
      ),
    );
    if(user===null){
      throw new UnauthorizedException({
        message: 'The email or password is incorrect',
      });
    }
    console.log(userDto.password)
    console.log("test",user)
    const pswEq = await bcrypt.compare(userDto.password, user.password);
    console.log(pswEq)
    if (user && pswEq) {
      return user;
    } else {
      throw new UnauthorizedException({
        message: 'The email or password is incorrect',
      });
    }
  }

  async signup(userDto: CreateUserDto) {
    const candidate = await lastValueFrom(
      this.userServiceClient.send(
        { cmd: 'get_user_by_email' },
        { email: userDto.email },
      ),
    );
    if (candidate) {
      throw new HttpException('email already exists', HttpStatus.BAD_REQUEST);
    }
    const hashPsw = await bcrypt.hash(userDto.password, 5);
    const user = await lastValueFrom(
      this.userServiceClient.send(
        { cmd: 'create_user' },
        { ...userDto, password: hashPsw },
      ),
    );
    return this.generateToken(user);
  }

  private async generateToken(user: any) {
    const payload = {
      email: user.email,
      id: user.id,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
