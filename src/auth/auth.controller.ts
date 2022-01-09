import { ResponseAddAccessTokenToHeaderInterceptor } from './interceptors/auth.interceptor';
import { AuthService } from './auth.service';
import { Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local.auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @UseInterceptors(ResponseAddAccessTokenToHeaderInterceptor)
  async login() {
    return { loginDate: new Date() };
  }
}
