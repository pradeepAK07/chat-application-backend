import { Controller, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccessTokenResponseDto } from './dtos/accessToken.response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('refresh-token')
  async getNewAccessToken(
    @Query('refreshToken') refreshToken: string,
  ): Promise<AccessTokenResponseDto> {
    return this.authService.getAccessToken(refreshToken);
  }
}
