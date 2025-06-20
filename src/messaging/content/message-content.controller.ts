import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
  ParseUUIDPipe,
  ValidationPipe,
} from '@nestjs/common';
import { MessageContentService } from './message-content.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AuthUser } from '../../auth/interfaces';
import {
  MessageChannel,
  TemplateStatus,
} from '../entities/message-template.entity';
import {
  CreateMessageTemplateDto,
  UpdateMessageTemplateDto,
  MessageTemplateResponseDto,
} from './dtos';
import { User } from 'src/auth/decorators/user.decorator';

@Controller('messaging/content')
@UseGuards(JwtAuthGuard)
export class MessageContentController {
  constructor(private readonly contentService: MessageContentService) {}

  @Get()
  findAll(): Promise<MessageTemplateResponseDto[]> {
    return this.contentService.findAll();
  }

  @Get('channel/:channel')
  findByChannel(
    @Param('channel') channel: MessageChannel,
  ): Promise<MessageTemplateResponseDto[]> {
    return this.contentService.findByChannel(channel);
  }

  @Get('status/:status')
  findByStatus(
    @Param('status') status: TemplateStatus,
  ): Promise<MessageTemplateResponseDto[]> {
    return this.contentService.findByStatus(status);
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<MessageTemplateResponseDto> {
    return this.contentService.findOne(id);
  }

  @Post()
  create(
    @Body(new ValidationPipe())
    createMessageTemplateDto: CreateMessageTemplateDto,
    @User() user: AuthUser,
  ): Promise<MessageTemplateResponseDto> {
    return this.contentService.create(createMessageTemplateDto, user);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(new ValidationPipe())
    updateMessageTemplateDto: UpdateMessageTemplateDto,
    @User() user: AuthUser,
  ): Promise<MessageTemplateResponseDto> {
    return this.contentService.update(id, updateMessageTemplateDto, user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.contentService.remove(id);
  }
}
