import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Traveling } from './traveling';

@ObjectType()
export class User {
  @Field()
  userId: string;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  firstname: string;

  @Field(() => [Traveling], { nullable: 'items' })
  travelings: Traveling[];

  @Field(() => Int)
  age: number;
}
