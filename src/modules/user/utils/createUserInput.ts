import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class createUserInput {
  @Field()
  firstName: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field()
  userName: string;

  @Field()
  password: string;
}
