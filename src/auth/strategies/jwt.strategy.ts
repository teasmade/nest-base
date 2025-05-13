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
      secretOrKey: jwtConstants.publicKey,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: JwtPayload) {
    // once here, token has been verified by passport lib
    // at the moment we're also verifying the payload on each request
    // notably to check whether the user is still enabled
    const user = await this.authService.verifyPayload(payload);
    const { id, email, profile } = user;

    // if we didn't verify the payload, we could just add id / email to the context:
    // const {sub: id, email} = payload;

    // what we return here will be on req.user in protected routes
    return {
      id: id,
      email: email,
      role: profile.role,
    };
  }
}
