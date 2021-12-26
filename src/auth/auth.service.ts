import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JWTpayload } from './models/payload.model';
import { User } from 'src/users/models/user';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = this.usersService.getUser({ username });
    if (user) {
      const { password, ...result } = user;
      const match = await compare(pass, password);
      if (match) {
        return result;
      }
    }
    return null;
  }

  async login(user: User) {
    const payload: JWTpayload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
