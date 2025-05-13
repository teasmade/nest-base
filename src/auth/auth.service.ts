import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users';
import { SignupDTO, LoginDTO } from './dtos';
import { AuthenticatedUser } from './interfaces/authenticated-user.interface';
import { User } from 'src/users/entities/user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // Validate user method for use with Passport
  public async validateUser(loginDTO: LoginDTO) {
    const user = await this.usersService.findOneByEmail(loginDTO.email);
    if (!user) {
      return null;
    }

    const isPasswordValid = await this.usersService.verifyPassword(
      loginDTO.password,
      user.password,
    );
    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  public async signUp(signupDTO: SignupDTO): Promise<AuthenticatedUser> {
    // TODO - verify password complexity e.g.
    // passwordHelper.verifyComplexity(signupDTO.password);

    const user = await this.usersService.createUser(signupDTO);

    const accessToken = this.generateAccessToken(user);

    return {
      id: user.id,
      email: user.email,
      accessToken: accessToken,
    };
  }

  public async login(loginDTO: LoginDTO) {
    const user = await this.validateUser(loginDTO);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = this.generateAccessToken(user);

    return {
      id: user.id,
      email: user.email,
      accessToken,
    };
  }

  private generateAccessToken(user: User) {
    const payload: JwtPayload = {
      sub: user.id,
    };
    return this.jwtService.sign(payload);
  }

  public async verifyPayload(payload: JwtPayload) {
    const user = await this.usersService.findOneById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (!user.isEnabled) {
      throw new UnauthorizedException('User is not enabled');
    }
    return user;
  }
}
