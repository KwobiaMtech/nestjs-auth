import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleModule } from 'nestjs-console';
import { connectionSource, dataSource } from 'ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { globalConfig } from './config';
import { AuthModule } from './modules/auth/auth.module';
import { MainModule } from './modules/main/main.module';

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
    AuthModule,
    MainModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
