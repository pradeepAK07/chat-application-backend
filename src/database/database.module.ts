import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from './db.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env',
          load: [dbConfig],
        }),
      ],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return { ...configService.get('typeOrmConfig').default };
      },
    }),
  ],
})
export class DataBaseModule {}
