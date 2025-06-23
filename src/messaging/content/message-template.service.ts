import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import {
  MessageTemplate,
  MessageChannel,
  TemplateStatus,
} from '../entities/message-template.entity';
import { AuthUser } from '../../auth/interfaces';
import {
  CreateMessageTemplateDto,
  UpdateMessageTemplateDto,
  MessageTemplateResponseDto,
} from './dtos';

@Injectable()
export class MessageTemplateService {
  constructor(
    @InjectRepository(MessageTemplate)
    private messageTemplateRepository: Repository<MessageTemplate>,
  ) {}

  async findAll(): Promise<MessageTemplateResponseDto[]> {
    const templates = await this.messageTemplateRepository.find({
      relations: ['createdBy', 'updatedBy'],
      order: { createdAt: 'DESC' },
    });

    return plainToInstance(MessageTemplateResponseDto, templates, {
      excludeExtraneousValues: true,
    });
  }

  async findOne(id: string): Promise<MessageTemplateResponseDto> {
    const template = await this.messageTemplateRepository.findOne({
      where: { id },
      relations: ['createdBy', 'updatedBy'],
    });

    if (!template) {
      throw new NotFoundException(`Message template ${id} not found`);
    }

    return plainToInstance(MessageTemplateResponseDto, template, {
      excludeExtraneousValues: true,
    });
  }

  async create(
    createMessageTemplateDto: CreateMessageTemplateDto,
    authUser: AuthUser,
  ): Promise<MessageTemplateResponseDto> {
    // Check if template name already exists
    const existingTemplate = await this.messageTemplateRepository.findOne({
      where: { name: createMessageTemplateDto.name },
    });

    if (existingTemplate) {
      throw new BadRequestException(
        `Template with name "${createMessageTemplateDto.name}" already exists`,
      );
    }

    const template = this.messageTemplateRepository.create({
      ...createMessageTemplateDto,
      createdBy: { id: authUser.id },
      updatedBy: { id: authUser.id },
    });

    const savedTemplate = await this.messageTemplateRepository.save(template);

    return plainToInstance(MessageTemplateResponseDto, savedTemplate, {
      excludeExtraneousValues: true,
    });
  }

  async update(
    id: string,
    updateMessageTemplateDto: UpdateMessageTemplateDto,
    authUser: AuthUser,
  ): Promise<MessageTemplateResponseDto> {
    const template = await this.messageTemplateRepository.findOne({
      where: { id },
    });

    if (!template) {
      throw new NotFoundException(`Message template ${id} not found`);
    }

    // Check if name is being updated and if it conflicts
    if (
      updateMessageTemplateDto.name &&
      updateMessageTemplateDto.name !== template.name
    ) {
      const existingTemplate = await this.messageTemplateRepository.findOne({
        where: { name: updateMessageTemplateDto.name },
      });

      if (existingTemplate) {
        throw new BadRequestException(
          `Template with name "${updateMessageTemplateDto.name}" already exists`,
        );
      }
    }

    Object.assign(template, {
      ...updateMessageTemplateDto,
      updatedBy: { id: authUser.id },
    });

    const updatedTemplate = await this.messageTemplateRepository.save(template);

    return plainToInstance(MessageTemplateResponseDto, updatedTemplate, {
      excludeExtraneousValues: true,
    });
  }

  async remove(id: string): Promise<void> {
    const template = await this.messageTemplateRepository.findOne({
      where: { id },
    });

    if (!template) {
      throw new NotFoundException(`Message template ${id} not found`);
    }

    try {
      await this.messageTemplateRepository.softRemove(template);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  async findByChannel(
    channel: MessageChannel,
  ): Promise<MessageTemplateResponseDto[]> {
    const templates = await this.messageTemplateRepository.find({
      where: { channel },
      relations: ['createdBy', 'updatedBy'],
      order: { createdAt: 'DESC' },
    });

    return plainToInstance(MessageTemplateResponseDto, templates, {
      excludeExtraneousValues: true,
    });
  }

  async findByStatus(
    status: TemplateStatus,
  ): Promise<MessageTemplateResponseDto[]> {
    const templates = await this.messageTemplateRepository.find({
      where: { status },
      relations: ['createdBy', 'updatedBy'],
      order: { createdAt: 'DESC' },
    });

    return plainToInstance(MessageTemplateResponseDto, templates, {
      excludeExtraneousValues: true,
    });
  }
}
