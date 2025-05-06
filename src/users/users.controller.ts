import {
  Controller,
  Get,
  Post,
  Body,
  ValidationPipe,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MockAuthGuard } from 'src/auth/mock-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  @UseGuards(MockAuthGuard)
  createUser(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Patch(':id')
  updateUser(
    @Body(new ValidationPipe()) updateUserDto: UpdateUserDto,
    // ParseIntPipe will transform the id to a number
    @Param('id') id: string,
  ) {
    return this.usersService.updateUser({
      ...updateUserDto,
      id,
    });
  }
}
