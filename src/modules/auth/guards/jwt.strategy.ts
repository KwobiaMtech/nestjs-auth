import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { GlobalConfig, globalConfig } from '../../../config';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthUserEntity } from '../entities/auth-user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(globalConfig.KEY) cfg: GlobalConfig,
    @InjectRepository(AuthUserEntity)
    private repository: Repository<AuthUserEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: cfg.auth.jwt.secret,
    });
  }

  async validate(payload: any) {
    const userId = payload.sub;
    const user = this.repository.findOne({ where: { id: userId } });
    if (!user) {
      return false;
    }
    return user;
  }
}
