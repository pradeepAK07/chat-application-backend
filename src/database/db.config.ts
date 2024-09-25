import { registerAs } from '@nestjs/config';

export default registerAs('typeOrmConfig', async () => {
  const data = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  };

  return {
    default: {
      // eslint-disable-next-line @typescript-eslint/prefer-as-const
      type: 'postgres' as 'postgres',
      host: data.host,
      port: parseInt(data.port),
      username: data.username,
      password: data.password,
      database: data.database,
      autoLoadEntities: true,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      subscribers: [__dirname + '/../**/*.subscriber{.ts,.js}'],
      migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
      cli: {
        migrationsDir: __dirname + '/../migrations',
      },
      synchronize: process.env.DB_SYNC === 'true',
      logging: true,
    },
  };
});
