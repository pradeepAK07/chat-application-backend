import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GqlAuthGuard } from './gql-auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { User } from '../user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { JwtRefreshStrategy } from './jwt-refresh.strategy';
import { RefreshAuthGuard } from './refresh-auth.guard';
import jwtConfig from '../config/jwt.config';
import jwtRefreshConfig from '../config/jwt-refresh.config';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule,
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(jwtRefreshConfig),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    JwtStrategy,
    GqlAuthGuard,
    AuthResolver,
    RefreshAuthGuard,
    JwtRefreshStrategy,
  ],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule {}
