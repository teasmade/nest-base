import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { User } from './users/entities/user.entity';
import { UserProfile } from './users/entities/user-profile.entity';
import { UserGroup } from './users/entities/user-group.entity';
import {
  Workflow,
  WorkflowVersion,
  WorkflowMapping,
} from './workflows/entities';
import { MessageTemplate, MessageSend } from './messaging/entities';
import * as dotenv from 'dotenv';

dotenv.config();

// The NestJS core DataSource instance uses this config for init in app.module.ts
// New entities should be added to the entities array as needed
export const dataSourceConfig: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: [
    User,
    UserProfile,
    UserGroup,
    Workflow,
    WorkflowVersion,
    WorkflowMapping,
    MessageTemplate,
    MessageSend,
  ],
  synchronize: false,
  migrations: ['src/db/migrations/*.js'],
  migrationsTableName: 'migrations',
  seeds: ['src/db/seeders/*.ts'],
  factories: ['src/db/factories/*.ts'],
};

// The exported DataSource instance is for use in contexts outside of the NestJS application
// E.g. CLI operations - migrations, seeders, etc.
const dataSource = new DataSource(dataSourceConfig);
export default dataSource;
