import { AuthModule } from './../auth/auth.module';
import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { ApiResolver } from './api.resolver';

@Module({
  imports: [UsersModule, AuthModule],
  providers: [ApiResolver],
})
export class ApiModule {}
