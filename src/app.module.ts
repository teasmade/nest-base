import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DataSource } from 'typeorm';
import { dataSourceConfig } from './app.datasource';
import { DiagnosticsModule } from './diagnostics/diagnostics.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceConfig),
    UsersModule,
    DiagnosticsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
