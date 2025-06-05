import { Module, ClassSerializerInterceptor } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DataSource } from 'typeorm';
import { dataSourceConfig } from './app.datasource';
import { PartnersModule } from './external-resources/partners/partners.module';
import { ContactsModule } from './external-resources/contacts/contacts.module';
import { WorkflowsModule } from './workflows/workflows.module';

@Module({
  imports: [
    CacheModule.register({ isGlobal: true }),
    TypeOrmModule.forRoot(dataSourceConfig),
    UsersModule,
    AuthModule,
    PartnersModule,
    ContactsModule,
    WorkflowsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
