import { AdminAuthController } from './controllers/admin.controller';

import { Module } from '@nestjs/common';
import { ApiKeyIdentityEntity } from './entities/api-key-identity.entity';
import { MixedAuthGuard } from './guards/mixed-auth.guard';
import { RoleAuthGuard } from './guards/role-auth.guard';

import { ConfigType } from '@nestjs/config';
import { globalConfig } from '../../config';
import { JwtStrategy } from './guards/jwt.strategy';

import { EmailIdentityProviderServiceToken } from './interfaces/email-identity-provider.service.interface';
import { EmailIdentityServiceProvider } from './services/email-identity-provider.service';
import { UserProviderServiceToken } from './interfaces/user-identity-provider.service.interface';
import { UserIdentityProviderService } from './services/user-identity-provider.service';
import { PasswordEncoderService } from './services/password-encorder.service';
import { RefreshTokenEntity } from './entities/refresh-token.entity';
import { JwtManagerService } from './services/jwt-manager.service';
import { AdminIdentityService } from './services/admin.service';
import { AuthUserEntity } from './entities/auth-user.entity';
import { PhoneIdentityEntity } from './entities/phone-identity.entity';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { EmailIdentityEntity } from './entities/email-identity.entity';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [globalConfig.KEY],
      useFactory: async (cfg: ConfigType<typeof globalConfig>) => {
        return {
          secret: cfg.auth.jwt.secret,
          signOptions: {
            expiresIn: cfg.auth.accessToken.expiresIn,
          },
        };
      },
    }),
    TypeOrmModule.forFeature([ApiKeyIdentityEntity, RefreshTokenEntity, AuthUserEntity, EmailIdentityEntity, PhoneIdentityEntity]),
  ],
  controllers: [AdminAuthController],
  providers: [
    // services
    AdminIdentityService,
    JwtManagerService,
    PasswordEncoderService,
    // token providers

    RoleAuthGuard,
    MixedAuthGuard,

    // strategy
    JwtStrategy,

    {
      provide: EmailIdentityProviderServiceToken,
      useFactory: (em: EntityManager) => {
       return new EmailIdentityServiceProvider(em.getRepository(EmailIdentityEntity));

      },
      inject: [EntityManager],
    },
    {
      provide: UserProviderServiceToken,
      useFactory: (em: EntityManager) => {
        return new UserIdentityProviderService(em.getRepository(AuthUserEntity));
      },
      inject: [EntityManager],
    },
  ],
  exports: [
    // services
    PasswordEncoderService,
    EmailIdentityProviderServiceToken,
    UserProviderServiceToken,

    TypeOrmModule,
    RoleAuthGuard,
    MixedAuthGuard,

    // strategy
    JwtStrategy,
  ],
})
export class AuthModule {}
