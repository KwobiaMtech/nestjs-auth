import { RequestContextModule } from '@medibloc/nestjs-request-context';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleModule } from 'nestjs-console';
import { connectionSource } from '../ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { globalConfig } from './config';
import { AuthModule } from './modules/auth/auth.module';
import { MainModule } from './modules/main/main.module';
import { AppRequestContext } from './utils/app-request.context';

@Module({
  imports: [
    ConsoleModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
      load: [globalConfig],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => await connectionSource,
    }),
    RequestContextModule.forRoot({
      isGlobal: true,
      contextClass: AppRequestContext,
    }),
    MainModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
