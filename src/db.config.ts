import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const DB_CONFIG: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'blog_db',
  autoLoadEntities: true,
  synchronize: false,
  entities: []
};
