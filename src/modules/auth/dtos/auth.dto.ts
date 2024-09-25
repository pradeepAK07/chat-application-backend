import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class userAuthDto {
  @Field()
  userName: string;
  @Field()
  password: String;
}
