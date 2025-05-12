import { Injectable } from '@nestjs/common';
import { UsersService } from '../users';
import { SignupDTO, LoginDTO } from './dtos';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  public async signUp(signupDTO: SignupDTO) {
    const user = await this.usersService.createUser(signupDTO);
    return user;
  }

  public async logIn(loginDTO: LoginDTO) {
    // const user = await this.usersService.findByEmail(loginDTO.email);
    // return user;
  }
}
