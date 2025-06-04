import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workflow } from './entities/workflow.entity';
import { WorkflowVersion } from './entities/workflow-version.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class WorkflowService {
  constructor(
    @InjectRepository(Workflow)
    private workflowRepository: Repository<Workflow>,
    @InjectRepository(WorkflowVersion)
    private versionRepository: Repository<WorkflowVersion>,
  ) {}

  async findAll(): Promise<Workflow[]> {
    return this.workflowRepository.find({
      relations: ['versions', 'activeVersion', 'createdBy', 'updatedBy'],
    });
  }

  async findOne(id: string): Promise<Workflow> {
    const workflow = await this.workflowRepository.findOne({
      where: { id },
      relations: ['versions', 'activeVersion', 'createdBy', 'updatedBy'],
    });

    if (!workflow) {
      throw new NotFoundException(`Workflow with ID ${id} not found`);
    }

    return workflow;
  }

  async create(workflowData: Partial<Workflow>, user: User): Promise<Workflow> {
    const workflow = this.workflowRepository.create({
      ...workflowData,
      createdBy: user,
      updatedBy: user,
    });
    return this.workflowRepository.save(workflow);
  }

  async update(
    id: string,
    workflowData: Partial<Workflow>,
    user: User,
  ): Promise<Workflow> {
    const workflow = await this.findOne(id);
    Object.assign(workflow, {
      ...workflowData,
      updatedBy: user,
    });
    return this.workflowRepository.save(workflow);
  }

  async remove(id: string): Promise<void> {
    const workflow = await this.findOne(id);
    await this.workflowRepository.remove(workflow);
  }

  async createVersion(
    workflowId: string,
    versionData: Partial<WorkflowVersion>,
    user: User,
  ): Promise<WorkflowVersion> {
    const workflow = await this.findOne(workflowId);
    const version = this.versionRepository.create({
      ...versionData,
      workflow,
      createdBy: user,
      updatedBy: user,
    });
    const savedVersion = await this.versionRepository.save(version);

    // If this is the first version, set it as active
    if (!workflow.activeVersion) {
      workflow.activeVersion = savedVersion;
      workflow.updatedBy = user;
      await this.workflowRepository.save(workflow);
    }

    return savedVersion;
  }

  async publishVersion(
    workflowId: string,
    versionId: string,
    user: User,
  ): Promise<WorkflowVersion> {
    const version = await this.versionRepository.findOne({
      where: { id: versionId, workflow: { id: workflowId } },
      relations: ['createdBy', 'updatedBy'],
    });

    if (!version) {
      throw new NotFoundException(
        `Version with ID ${versionId} not found for workflow ${workflowId}`,
      );
    }

    version.isPublished = true;
    version.updatedBy = user;
    const savedVersion = await this.versionRepository.save(version);

    // Set as active version
    const workflow = await this.findOne(workflowId);
    workflow.activeVersion = savedVersion;
    workflow.updatedBy = user;
    await this.workflowRepository.save(workflow);

    return savedVersion;
  }

  async setActiveVersion(
    workflowId: string,
    versionId: string,
    user: User,
  ): Promise<Workflow> {
    const workflow = await this.findOne(workflowId);
    const version = await this.versionRepository.findOne({
      where: { id: versionId, workflow: { id: workflowId } },
      relations: ['createdBy', 'updatedBy'],
    });

    if (!version) {
      throw new NotFoundException(
        `Version with ID ${versionId} not found for workflow ${workflowId}`,
      );
    }

    if (!version.isPublished) {
      throw new BadRequestException(
        'Cannot set an unpublished version as active',
      );
    }

    workflow.activeVersion = version;
    workflow.updatedBy = user;
    return this.workflowRepository.save(workflow);
  }
}
