import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { createUserInput } from '../user/utils/createUserInput';
import * as bcrpt from 'bcrypt';
import {
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { SignInResponseDto } from './dtos/sign-in.response.dto';
import jwtRefreshConfig from '../config/jwt-refresh.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(jwtRefreshConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof jwtRefreshConfig>,
  ) {}

  async userSignUp(
    createUserInput: createUserInput,
  ): Promise<SignInResponseDto> {
    try {
      const user = await this.userService.createUser(createUserInput);
      const payload = { userName: user.userName, sub: user.id };
      const accessToken = await this.jwtService.signAsync(payload);
      const refreshToken = await this.jwtService.signAsync(
        payload,
        this.refreshTokenConfig,
      );
      return {
        accessToken,
        refreshToken,
        userDetails: user,
      };
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  async userSignIn(
    userName: string,
    password: string,
  ): Promise<SignInResponseDto> {
    const user = await this.userService.findUserByUserName(userName);
    if (user && (await bcrpt.compare(password, user.password))) {
      const payload = { userName, sub: user.id };
      const accessToken = await this.jwtService.signAsync(payload);
      const refreshToken = await this.jwtService.signAsync(
        payload,
        this.refreshTokenConfig,
      );
      return {
        accessToken,
        refreshToken,
        userDetails: user,
      };
    } else {
      throw new NotFoundException('user does not exist!');
    }
  }

  async getAccessToken(refreshToken: string) {
    try {
      const decoded = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      const user = await this.userService.findUserById(decoded.sub);
      const payload = { username: user.userName, sub: user.id };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    } catch (err) {
      throw new Error('Invalid refresh token');
    }
  }
}
