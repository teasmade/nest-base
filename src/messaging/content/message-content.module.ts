import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageTemplate } from '../entities/message-template.entity';
import { MessageTemplateService } from './message-template.service';
import { MessageTemplateController } from './message-template.controller';
import { UsersModule } from '../../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([MessageTemplate]), UsersModule],
  controllers: [MessageTemplateController],
  providers: [MessageTemplateService],
  exports: [MessageTemplateService],
})
export class MessageContentModule {}
