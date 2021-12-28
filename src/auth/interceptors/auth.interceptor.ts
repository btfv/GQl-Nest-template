import { HTTP_HEADER_AUTHORIZATION } from './../constants/headers.config';
import { AuthService } from './../auth.service';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { Response as ExpressResponse } from 'express';

@Injectable()
export class ResponseAddAccessTokenToHeaderInterceptor
  implements NestInterceptor
{
  constructor(private readonly authService: AuthService) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const ResponseObj: ExpressResponse = context.switchToHttp().getResponse();
    const req = context.switchToHttp().getRequest();
    const { access_token } = await this.authService.login(req.user);
    ResponseObj.setHeader(HTTP_HEADER_AUTHORIZATION, `Bearer ${access_token}`);
    return next.handle();
  }
}
