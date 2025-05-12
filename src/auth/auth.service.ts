import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users';
import { SignupDTO, LoginDTO } from './dtos';
import { AuthenticatedUser } from './interfaces/authenticated-user.interface';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  public async signUp(signupDTO: SignupDTO): Promise<AuthenticatedUser> {
    // TODO - verify password complexity e.g.
    // passwordHelper.verifyComplexity(signupDTO.password);

    const user = await this.usersService.createUser(signupDTO);

    return {
      id: user.id,
      email: user.email,
      accessToken: 'MY-FAKE-ACCESS-TOKEN',
    };
  }

  public async logIn(loginDTO: LoginDTO) {
    const user = await this.usersService.findUserByEmailPassword(loginDTO);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isEnabled) {
      throw new UnauthorizedException('User is not enabled');
    }

    return {
      id: user.id,
      email: user.email,
      accessToken: 'MY-FAKE-ACCESS-TOKEN',
    };
  }
}
