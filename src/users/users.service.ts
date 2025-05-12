import { Injectable } from '@nestjs/common';
import { hashPassword } from './hash.helper';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
// import { CreateUserDto } from './dto/create-user.dto';
import { SignupDTO } from '../auth';
import { EmailConflictError } from './errors/email-conflict.error';
import { UserProfile } from './entities/user-profile.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(UserProfile)
    private userProfilesRepository: Repository<UserProfile>,
  ) {}

  async createUser(signupDTO: SignupDTO) {
    const existingUser = await this._findUserByAttr('email', signupDTO.email);
    if (existingUser) {
      throw new EmailConflictError();
    }

    // Reminder - always work with class instances, not raw objects
    // This ensure that serialize interceptor works as expected
    // TODO - write password return test to check serializer interception

    // Create empty user profile - details here to be refined once more business logic is determined
    const userProfile = this.userProfilesRepository.create();
    userProfile.firstName = '';
    userProfile.lastName = '';
    await this.userProfilesRepository.save(userProfile);

    const user = this.usersRepository.create();
    user.email = signupDTO.email;
    user.password = await hashPassword(signupDTO.password);
    user.isAnon = false;
    user.isEnabled = true;
    user.profile = userProfile;

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

  // async validateUser(email: string, password: string) {
  //   const user = await this._findUserByAttr('email', email);
  //   if (!user) {
  //     throw new UnauthorizedException('Invalid credentials');
  //   }
  //   return matchPassword(password, user.password);
  // }
}
