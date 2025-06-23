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
import { MessageTemplateService } from './message-template.service';
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

@Controller('messaging/templates')
@UseGuards(JwtAuthGuard)
export class MessageTemplateController {
  constructor(private readonly templateService: MessageTemplateService) {}

  @Get()
  findAll(): Promise<MessageTemplateResponseDto[]> {
    return this.templateService.findAll();
  }

  @Get('channel/:channel')
  findByChannel(
    @Param('channel') channel: MessageChannel,
  ): Promise<MessageTemplateResponseDto[]> {
    return this.templateService.findByChannel(channel);
  }

  @Get('status/:status')
  findByStatus(
    @Param('status') status: TemplateStatus,
  ): Promise<MessageTemplateResponseDto[]> {
    return this.templateService.findByStatus(status);
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<MessageTemplateResponseDto> {
    return this.templateService.findOne(id);
  }

  @Post()
  create(
    @Body(new ValidationPipe())
    createMessageTemplateDto: CreateMessageTemplateDto,
    @User() user: AuthUser,
  ): Promise<MessageTemplateResponseDto> {
    return this.templateService.create(createMessageTemplateDto, user);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(new ValidationPipe())
    updateMessageTemplateDto: UpdateMessageTemplateDto,
    @User() user: AuthUser,
  ): Promise<MessageTemplateResponseDto> {
    return this.templateService.update(id, updateMessageTemplateDto, user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.templateService.remove(id);
  }
}
