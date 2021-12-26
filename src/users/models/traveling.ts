import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Traveling {
  @Field()
  travelingId: string;

  @Field()
  title: string;

  @Field()
  destination: string;

  @Field(() => [String])
  participants: string[];

  @Field({ nullable: true })
  departure?: string;
}
