import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export interface GlobalConfig {
  appEnv: 'dev' | 'stg' | 'prod' | 'test';
  auth: {
    jwt: {
      secret: string;
    };
    refreshToken: {
      expiresIn: number;
    };
    accessToken: {
      expiresIn: number;
    };
  };
}

const GlobalConfigSchema = Joi.object<GlobalConfig>({
  appEnv: Joi.string().valid('dev', 'stg', 'prod', 'test').required(),
  auth: Joi.object<GlobalConfig['auth']>({
    jwt: Joi.object<GlobalConfig['auth']['jwt']>({
      secret: Joi.string().required(),
    }),
    refreshToken: Joi.object<GlobalConfig['auth']['refreshToken']>({
      expiresIn: Joi.number().required(),
    }),
    accessToken: Joi.object<GlobalConfig['auth']['accessToken']>({
      expiresIn: Joi.number().required(),
    }),
  }),
});

export const globalConfig = registerAs('global', () => {
  const appEnv = process.env.APP_ENV ?? 'dev';
  const cfg = {
    appEnv,
    auth: {
      jwt: {
        secret: 'supersecret',
      },
      refreshToken: {
        expiresIn: 3600 * 24 * 30, // 1 month
      },
      accessToken: {
        expiresIn: 3600 / 4, // 15 mins
      },
    },
  } as GlobalConfig;

  if (!cfg.appEnv) {
    cfg.appEnv = 'dev';
  }

  // Validate
  const result = GlobalConfigSchema.validate(cfg, {
    allowUnknown: true,
    abortEarly: false,
  });
  if (result.error) {
    console.error('GlobalConfig Validation errors:');
    for (const v of result.error.details) {
      console.error(v.message);
    }
    throw new Error('Missing configuration options');
  }
  return cfg;
});
