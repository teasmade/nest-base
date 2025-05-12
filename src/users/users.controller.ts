import {
  Controller,
  // Post,
  // Body,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UsersService } from './users.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // TODO - move to auth controller
  // @Post('signup')
  // async signup(@Body() createUserDto: CreateUserDto) {
  //   return await this.usersService.createUser(createUserDto);
  // }

  @Get()
  async getUsers() {
    return await this.usersService.findAllUsers();
  }
}
