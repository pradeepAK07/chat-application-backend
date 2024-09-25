import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AccessTokenResponseDto {
  @Field()
  accessToken: string;
}
