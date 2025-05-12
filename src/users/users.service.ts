import { Injectable, UnauthorizedException } from '@nestjs/common';
import { hashPassword, matchPassword } from './hash.helper';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
// import { CreateUserDto } from './dto/create-user.dto';
import { SignupDTO, LoginDTO } from '../auth';
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

  public async findAllUsers() {
    return this.usersRepository.find();
  }

  public async findUserByEmailPassword(loginDTO: LoginDTO) {
    const user = await this._findUserByAttr('email', loginDTO.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    await this._verifyPassword(loginDTO.password, user.password);
    return user;
  }

  private async _findUserByAttr(
    attr: string,
    value: string | number | boolean,
  ) {
    return await this.usersRepository.findOneBy({ [attr]: value });
  }

  private async _verifyPassword(inputPassword: string, userPassword: string) {
    const isPasswordMatch = await matchPassword(inputPassword, userPassword);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
