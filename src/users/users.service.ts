import { Injectable } from '@nestjs/common';
import { hashPassword } from './hash.helper';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { EmailConflictError } from './errors/email-conflict.error';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // TODO - dto to come from auth module once it's in place, auth module route pipe can handle check password complexity
  async createUser(createUserDto: CreateUserDto) {
    const existingUser = await this._findUserByAttr(
      'email',
      createUserDto.email,
    );
    if (existingUser) {
      throw new EmailConflictError();
    }

    // Reminder - always work with class instances, not raw objects
    // This ensure that serialize interceptor works as expected
    const user = this.usersRepository.create();

    user.email = createUserDto.email;
    user.password = await hashPassword(createUserDto.password);
    user.isAnon = false;
    user.isEnabled = true;

    await this.usersRepository.save(user);

    return user;
  }

  async findAllUsers() {
    return this.usersRepository.find();
  }

  private async _findUserByAttr(
    attr: string,
    value: string | number | boolean,
  ) {
    return await this.usersRepository.findOneBy({ [attr]: value });
  }

  // CARRY on work from https://github.com/Platekun/NestAuthExample/blob/master/src/users/users.service.ts

  // async validateUser(email: string, password: string) {
  //   const user = await this._findUserByAttr('email', email);
  //   if (!user) {
  //     throw new UnauthorizedException('Invalid credentials');
  //   }
  //   return matchPassword(password, user.password);
  // }
}
