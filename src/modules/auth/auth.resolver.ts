import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { createUserInput } from '../user/utils/createUserInput';
import { SignInResponseDto } from './dtos/sign-in.response.dto';
import { AccessTokenResponseDto } from './dtos/accessToken.response.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => SignInResponseDto)
  async userSignUp(
    @Args('createUserInput') createUserInput: createUserInput,
  ): Promise<SignInResponseDto> {
    return await this.authService.userSignUp(createUserInput);
  }

  @Mutation(() => AccessTokenResponseDto)
  getNewAccessToken(
    @Args('refreshToken') refreshToken: string,
  ): Promise<AccessTokenResponseDto> {
    return this.authService.getAccessToken(refreshToken);
  }

  @Mutation(() => SignInResponseDto)
  async userSignIn(
    @Args('userName') userName: string,
    @Args('password') password: string,
  ): Promise<SignInResponseDto> {
    const userInfo = await this.authService.userSignIn(userName, password);
    return userInfo;
  }
}
