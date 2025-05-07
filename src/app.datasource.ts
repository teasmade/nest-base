import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { User } from './users/entities/user.entity';
import { UserProfile } from './users/entities/user-profile.entity';

export const dataSourceConfig: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: [User, UserProfile],
  synchronize: false,
  migrations: ['src/db/migrations/*.js'],
  migrationsTableName: 'migrations',
  seeds: ['src/db/seeders/*.ts'],
};

const dataSource = new DataSource(dataSourceConfig);
export default dataSource;

// docker compose run nest-app su -c 'npx typeorm-ts-node-commonjs migration:generate src/db/migrations/Initial -o -d src/app.datasource.ts' node
// docker compose run nest-app su -c 'npx typeorm-ts-node-commonjs migration:run -d src/app.datasource.ts' node
// docker compose run nest-app su -c 'npx typeorm-ts-node-commonjs migration:revert -d src/app.datasource.ts' node
