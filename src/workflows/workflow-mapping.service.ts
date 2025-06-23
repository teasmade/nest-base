import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkflowMapping } from './entities/workflow-mapping.entity';
import { Workflow } from './entities/workflow.entity';
import {
  CreateWorkflowMappingDto,
  UpdateWorkflowMappingDto,
  WorkflowMappingResponseDto,
} from './dtos/workflow-mapping';

@Injectable()
export class WorkflowMappingService {
  constructor(
    @InjectRepository(WorkflowMapping)
    private readonly workflowMappingRepository: Repository<WorkflowMapping>,
    @InjectRepository(Workflow)
    private readonly workflowRepository: Repository<Workflow>,
  ) {}

  async create(
    dto: CreateWorkflowMappingDto,
  ): Promise<WorkflowMappingResponseDto> {
    const mapping = this.workflowMappingRepository.create({
      name: dto.name,
      label: dto.label,
      description: dto.description,
    });
    if (dto.workflowId) {
      mapping.workflow = await this.workflowRepository.findOneByOrFail({
        id: dto.workflowId,
      });
    }
    const saved = await this.workflowMappingRepository.save(mapping);
    return this._toResponseDto(saved);
  }

  async findAll(): Promise<WorkflowMappingResponseDto[]> {
    const mappings = await this.workflowMappingRepository.find({
      relations: ['workflow'],
    });
    return mappings.map(this._toResponseDto);
  }

  async findOne(id: string): Promise<WorkflowMappingResponseDto> {
    const mapping = await this.workflowMappingRepository.findOne({
      where: { id },
      relations: ['workflow'],
    });
    if (!mapping) throw new NotFoundException('WorkflowMapping not found');
    return this._toResponseDto(mapping);
  }

  async update(
    id: string,
    dto: UpdateWorkflowMappingDto,
  ): Promise<WorkflowMappingResponseDto> {
    const mapping = await this.workflowMappingRepository.findOne({
      where: { id },
      relations: ['workflow'],
    });
    if (!mapping) throw new NotFoundException('WorkflowMapping not found');
    if (dto.name !== undefined) mapping.name = dto.name;
    if (dto.label !== undefined) mapping.label = dto.label;
    if (dto.description !== undefined) mapping.description = dto.description;
    if (dto.workflowId !== undefined) {
      if (dto.workflowId) {
        mapping.workflow = await this.workflowRepository.findOneByOrFail({
          id: dto.workflowId,
        });
      } else {
        mapping.workflow = null; // Mappings can have no current workflow link
      }
    }
    const saved = await this.workflowMappingRepository.save(mapping);
    return this._toResponseDto(saved);
  }

  async remove(id: string): Promise<void> {
    const mapping = await this.workflowMappingRepository.findOneBy({ id });
    if (!mapping) throw new NotFoundException('WorkflowMapping not found');
    await this.workflowMappingRepository.remove(mapping);
  }

  private _toResponseDto = (
    mapping: WorkflowMapping,
  ): WorkflowMappingResponseDto => ({
    id: mapping.id,
    name: mapping.name,
    label: mapping.label,
    description: mapping.description,
    workflowId: mapping.workflow ? mapping.workflow.id : null,
    createdAt: mapping.createdAt,
    updatedAt: mapping.updatedAt,
  });
}
