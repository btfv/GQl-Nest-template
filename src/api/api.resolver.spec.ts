import { GlobalsModule } from './../globals/globals.module';
import { AuthModule } from './../auth/auth.module';
import { UsersModule } from './../users/users.module';
import { Test, TestingModule } from '@nestjs/testing';
import { ApiResolver } from './api.resolver';

describe('ApiResolver', () => {
  let resolver: ApiResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [GlobalsModule, UsersModule, AuthModule],

      providers: [ApiResolver],
    }).compile();

    resolver = module.get<ApiResolver>(ApiResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
