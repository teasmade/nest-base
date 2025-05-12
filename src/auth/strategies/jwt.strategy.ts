import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../auth.constants';
import { JwtPayload } from '../interfaces';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret as string,
    });
  }

  async validate(payload: JwtPayload) {
    // once here, token has been verified by passport lib
    const user = await this.authService.verifyPayload(payload);

    // what we return here will be on req.user in protected routes
    return {
      id: payload.sub,
      email: payload.email,
      role: user.profile.role,
    };
  }
}
