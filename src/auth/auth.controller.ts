import {
  Controller,
  HttpCode,
  Post,
  Body,
  Request,
  // UsePipes,
  // ValidationPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignupDTO, LoginDTO } from './dtos';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthReq } from './interfaces';

@Controller('auth')
// @UsePipes(new ValidationPipe())
// TODO - shift ClassSerializerInterceptor to global interceptor
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signUp(@Body() signupDTO: SignupDTO) {
    return await this.authService.signUp(signupDTO);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    return this.authService.login(loginDTO);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  async refresh(@Req() req: AuthReq) {
    return this.authService.refresh(req.user.id);
  }
}
