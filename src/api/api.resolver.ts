import { GqlAuthGuard } from './../auth/guards/gql.auth.guard';
import { DeleteUserInput } from './../users/dto/input/delete_user.input';
import { User } from './../users/models/user';
import { UsersService } from './../users/users.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GetUserArgs } from './../users/dto/args/get_user.args';
import { CreateUserInput } from './../users/dto/input/create_user.input';

@Resolver()
export class ApiResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User, { name: 'user', nullable: true })
  getUser(@Args() getUserArgs: GetUserArgs): User {
    return this.usersService.getUser(getUserArgs);
  }

  @Mutation(() => User)
  async createUser(
    @Args('createUserData') createUserData: CreateUserInput,
  ): Promise<User> {
    return await this.usersService.createUser(createUserData);
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  deleteUser(@Args('deleteUserData') deleteUserData: DeleteUserInput): User {
    return this.usersService.deleteUser(deleteUserData);
  }
}
