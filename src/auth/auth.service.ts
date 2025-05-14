import { Injectable, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users';
import { SignupDTO, LoginDTO } from './dtos';
import { User } from 'src/users/entities/user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { ErrorCode } from 'src/common/errors/enums/error-code.enum';
import throwCodedError from 'src/common/errors/coded-error';
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

  public async signUp(signupDTO: SignupDTO) {
    // TODO - verify password complexity e.g.
    // passwordHelper.verifyComplexity(signupDTO.password);
    // TS > have to pass undefined if default provided?
    if (signupDTO.password.length < 8) {
      throwCodedError(ErrorCode.PASSWORD_TOO_SHORT, HttpStatus.BAD_REQUEST);
    }

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
      throwCodedError(ErrorCode.INVALID_CREDENTIALS, HttpStatus.UNAUTHORIZED);
    }

    const accessToken = this.generateAccessToken(user);

    return {
      id: user.id,
      email: user.email,
      accessToken,
    };
  }

  public async refresh(id: string) {
    const user = await this.usersService.findOneById(id);
    if (!user) {
      throwCodedError(ErrorCode.INVALID_CREDENTIALS, HttpStatus.UNAUTHORIZED);
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
      throwCodedError(ErrorCode.INVALID_CREDENTIALS, HttpStatus.UNAUTHORIZED);
    }
    if (!user.isEnabled) {
      throwCodedError(ErrorCode.USER_NOT_ENABLED, HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
