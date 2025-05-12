import {
  Controller,
  HttpCode,
  Post,
  Body,
  // UsePipes,
  // ValidationPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignupDTO, LoginDTO } from './dtos';

@Controller('auth')
// @UsePipes(new ValidationPipe())
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(201)
  @Post('signup')
  async onUserSignUp(@Body() signupDTO: SignupDTO) {
    return await this.authService.signUp(signupDTO);
  }

  @HttpCode(200)
  @Post('login')
  async onUserLogin(@Body() loginDTO: LoginDTO) {
    return await this.authService.logIn(loginDTO);
  }
}
