import { UserInputError } from 'apollo-server-express';
import { hash } from 'bcrypt';
import { nanoid } from 'nanoid';
import { SALT_ROUNDS } from './constants/cryptography.config';
import { GetUserArgs } from './dto/args/get_user.args';
import { CreateUserInput } from './dto/input/create_user.input';
import { DeleteUserInput } from './dto/input/delete_user.input';
import { User } from './models/user';

export class UsersService {
  private users: User[] = [];
  public async createUser(createUserData: CreateUserInput): Promise<User> {
    const encoded_pass = await hash(createUserData.password, SALT_ROUNDS);

    const user: User = {
      ...createUserData,
      userId: nanoid(),
      travelings: [],
      password: encoded_pass,
    };
    this.users.push(user);

    return user;
  }

  public getUser(getUserArgs: GetUserArgs): User {
    const user = this.users.find(
      (user) =>
        user.userId === getUserArgs.userId ||
        user.username === getUserArgs.username,
    );
    if (!user) {
      throw new UserInputError('User not found');
    }
    return user;
  }

  public deleteUser(deleteUserData: DeleteUserInput): User {
    const userIndex = this.users.findIndex(
      (user) => user.userId === deleteUserData.userId,
    );

    if (userIndex === -1) {
      throw new UserInputError('User not found');
    }

    const user = this.users[userIndex];

    this.users.splice(userIndex);

    return user;
  }
}
