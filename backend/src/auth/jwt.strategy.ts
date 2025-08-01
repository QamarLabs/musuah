import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET, // Use environment variables
    });
  }

  async validate(payload: any): Promise<any> {
    console.log("Validate:", payload)
    const user = await this.authService.getUserById(payload.id);
    const isExpired = (new Date().getTime() / 1000) > payload.exp;
    if (!user || isExpired) {
      throw new UnauthorizedException();
    }
    
    return user;
  }
}