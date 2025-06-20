import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageTemplate } from '../entities/message-template.entity';
import { MessageContentService } from './message-content.service';
import { MessageContentController } from './message-content.controller';
import { UsersModule } from '../../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([MessageTemplate]), UsersModule],
  controllers: [MessageContentController],
  providers: [MessageContentService],
  exports: [MessageContentService],
})
export class MessageContentModule {}
