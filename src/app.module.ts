import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionSource, dataSource } from 'ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { globalConfig } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
      load: [globalConfig],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => await connectionSource,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
