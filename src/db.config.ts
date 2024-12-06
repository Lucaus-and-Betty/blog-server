import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

if (process.env.RUNNING_ENV !== 'prod') {
  dotenv.config({ path: process.cwd() + '/.env.dev' });
} else {
  dotenv.config({ path: process.cwd() + '/.env.prod' });
}

console.log(process.cwd() + '/.env.prod');

console.log(process.env.NODE_ENV_DB_HOST);

export const DB_CONFIG: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.NODE_ENV_DB_HOST,
  port: Number(process.env.NODE_ENV_DB_PORT),
  username: process.env.NODE_ENV_DB_USER,
  password: process.env.NODE_ENV_DB_PASSWORD,
  database: 'blog_db',
  autoLoadEntities: true,
  synchronize: false,
  entities: []
};
