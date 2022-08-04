import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CreateAdminCommand } from './commands/create-admin.console';
import { AdminEntity } from './entities/admin.entity';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [AuthModule,TypeOrmModule.forFeature([UserEntity, AdminEntity])],
  controllers: [],
  providers: [CreateAdminCommand],
  exports: [TypeOrmModule],
})
export class MainModule {}
