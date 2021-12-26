import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((val) => {
        const res = context.switchToHttp().getResponse();
        res.header('Authorizarion', 'Bearer ' + val.access_token);
        return val;
      }),
    );
  }
}
