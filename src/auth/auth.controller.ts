import { AuthService } from './auth.service';
import {
  Controller,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local.auth.guard';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @UseInterceptors(new AuthInterceptor())
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }
}
