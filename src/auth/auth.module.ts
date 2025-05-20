import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth.constants';
import { Algorithm } from 'jsonwebtoken';
import { OasisModule } from 'src/oasis/oasis.module';

const { privateKey, publicKey, expiresIn, issuer, algorithm } = jwtConstants;

@Module({
  imports: [
    UsersModule,
    OasisModule,
    PassportModule,
    JwtModule.register({
      privateKey,
      publicKey,
      signOptions: {
        expiresIn,
        issuer,
        algorithm: algorithm as Algorithm,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
