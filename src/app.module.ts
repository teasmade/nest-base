import { Module, ClassSerializerInterceptor } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { dataSourceConfig } from './app.datasource';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PartnersModule } from './external-resources/partners/partners.module';
import { ContactsModule } from './external-resources/contacts/contacts.module';
import { DemandesModule } from './external-resources/demandes/demandes.module';
import { WorkflowsModule } from './workflows/workflows.module';
import { MessagingModule } from './messaging/messaging.module';

@Module({
  imports: [
    CacheModule.register({ isGlobal: true }),
    TypeOrmModule.forRoot(dataSourceConfig),
    EventEmitterModule.forRoot(),
    UsersModule,
    AuthModule,
    PartnersModule,
    ContactsModule,
    WorkflowsModule,
    DemandesModule,
    MessagingModule,
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
