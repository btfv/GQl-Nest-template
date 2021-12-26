import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, Length, MaxLength, Min } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty()
  @Length(4, 30)
  username: string;

  @Field()
  @IsNotEmpty()
  @Min(18)
  age: number;

  @Field()
  @MaxLength(32)
  firstname: string;

  @Field()
  @Length(6, 30)
  password: string;
}
