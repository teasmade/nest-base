import { Injectable } from '@nestjs/common';
import { hashPassword, matchPassword } from './hash.helper';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDTO } from '../auth';
import { EmailConflictError } from './errors/email-conflict.error';
import { UserProfile } from './entities/user-profile.entity';
import { MessagingService } from '../messaging/messaging.service';
import { SendSmsDTO } from 'src/messaging/channels/sms/dtos';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(UserProfile)
    private userProfilesRepository: Repository<UserProfile>,
    private messagingService: MessagingService,
  ) {}

  async createUser(signupDTO: SignupDTO) {
    const existingUser = await this.findOneByEmail(signupDTO.email);
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

  public async findAll(authUserId: string) {
    // TODO - remove sms send test
    const dto: SendSmsDTO = {
      authUserId,
      smsDTO: {
        to: '+1234567890',
        text: `Hello from ${authUserId}`,
      },
    };

    await this.messagingService.sendSms(dto);

    return this.usersRepository.find({
      relations: ['profile'],
    });
  }

  public async findOneByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email },
      relations: ['profile'],
    });
  }

  public async findOneById(id: string) {
    return this.usersRepository.findOne({
      where: { id },
      relations: ['profile'],
    });
  }

  public async verifyPassword(
    inputPassword: string,
    userPassword: string,
  ): Promise<boolean> {
    const isPasswordMatch = await matchPassword(inputPassword, userPassword);
    return isPasswordMatch;
  }
}
