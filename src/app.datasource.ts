import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './users/entities/user.entity';

export const dataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: [User],
  synchronize: false,
  migrations: ['src/migrations/*.js'],
  migrationsTableName: 'migrations',
};

const dataSource = new DataSource(dataSourceConfig);
export default dataSource;

// docker compose run nest-app su -c 'npx typeorm-ts-node-commonjs migration:generate src/migrations/Initial2 -o -d src/app.datasource.ts' node
// docker compose run nest-app su -c 'npx typeorm-ts-node-commonjs migration:run -d src/app.datasource.ts' node
// docker compose run nest-app su -c 'npx typeorm-ts-node-commonjs migration:revert -d src/app.datasource.ts' node
