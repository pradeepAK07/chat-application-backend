import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/modules/user/entities/user.entity';

@ObjectType()
export class SignInResponseDto {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;

  @Field(() => User)
  userDetails: User;
}
