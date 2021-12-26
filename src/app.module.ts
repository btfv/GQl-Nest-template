import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { GlobalsModule } from './globals/globals.module';
import { ApiModule } from './api/api.module';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: false,
      playground: true,
      autoSchemaFile: true,
      sortSchema: true,
    }),
    GlobalsModule,
    UsersModule,
    AuthModule,
    ApiModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
