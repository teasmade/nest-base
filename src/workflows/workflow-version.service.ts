import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkflowVersion } from './entities/workflow-version.entity';
import { Workflow } from './entities/workflow.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class WorkflowVersionService {
  constructor(
    @InjectRepository(WorkflowVersion)
    private versionRepository: Repository<WorkflowVersion>,
    @InjectRepository(Workflow)
    private workflowRepository: Repository<Workflow>,
  ) {}

  async findAll(workflowId: string): Promise<WorkflowVersion[]> {
    return this.versionRepository.find({
      where: { workflow: { id: workflowId } },
      relations: ['createdBy', 'updatedBy'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(workflowId: string, id: string): Promise<WorkflowVersion> {
    const version = await this.versionRepository.findOne({
      where: { id, workflow: { id: workflowId } },
      relations: ['createdBy', 'updatedBy'],
    });

    if (!version) {
      throw new NotFoundException(
        `Version with ID ${id} not found for workflow ${workflowId}`,
      );
    }

    return version;
  }

  async create(
    workflowId: string,
    versionData: Partial<WorkflowVersion>,
    user: User,
  ): Promise<WorkflowVersion> {
    const workflow = await this.workflowRepository.findOne({
      where: { id: workflowId },
      relations: ['activeVersion'],
    });

    if (!workflow) {
      throw new NotFoundException(`Workflow with ID ${workflowId} not found`);
    }

    const version = this.versionRepository.create({
      ...versionData,
      workflow,
      createdBy: user,
      updatedBy: user,
    });

    const savedVersion = await this.versionRepository.save(version);

    return savedVersion;
  }

  async update(
    workflowId: string,
    id: string,
    versionData: Partial<WorkflowVersion>,
    user: User,
  ): Promise<WorkflowVersion> {
    const workflow = await this.workflowRepository.findOne({
      where: { id: workflowId },
      relations: ['activeVersion'],
    });

    if (!workflow) {
      throw new NotFoundException(`Workflow with ID ${workflowId} not found`);
    }

    if (workflow?.activeVersion?.id === id) {
      throw new BadRequestException('Cannot update the active version');
    }

    const version = await this.findOne(workflowId, id);

    Object.assign(version, {
      ...versionData,
      updatedBy: user,
    });

    return this.versionRepository.save(version);
  }

  async remove(workflowId: string, id: string): Promise<void> {
    const workflow = await this.workflowRepository.findOne({
      where: { id: workflowId },
      relations: ['activeVersion'],
    });

    if (workflow?.activeVersion?.id === id) {
      throw new BadRequestException('Cannot delete the active version');
    }

    const version = await this.findOne(workflowId, id);
    // Don't allow deleting published versions - safety net?
    if (version.isPublished) {
      throw new BadRequestException('Cannot delete a published version');
    }

    await this.versionRepository.remove(version);
  }

  async publish(
    workflowId: string,
    id: string,
    user: User,
  ): Promise<{
    publishedVersion: WorkflowVersion;
    publishedWorkflow?: Workflow;
  }> {
    const workflow = await this.workflowRepository.findOne({
      where: { id: workflowId },
      relations: ['activeVersion', 'versions'],
    });

    if (!workflow) {
      throw new NotFoundException(`Workflow with ID ${workflowId} not found`);
    }
    const version = workflow.versions.find((v) => v.id === id);

    if (!version) {
      throw new NotFoundException(
        `Version with ID ${id} not found in workflow ${workflowId}`,
      );
    }

    if (version.isPublished) {
      throw new BadRequestException('Version is already published');
    }

    version.isPublished = true;
    version.updatedBy = user;

    let savedWorkflow: Workflow | null = null;
    if (!workflow.isPublished) {
      workflow.isPublished = true;
      workflow.updatedBy = user;
      savedWorkflow = await this.workflowRepository.save(workflow);
    }
    const savedVersion = await this.versionRepository.save(version);

    const result: {
      publishedVersion: WorkflowVersion;
      publishedWorkflow?: Workflow;
    } = {
      publishedVersion: savedVersion,
    };
    if (savedWorkflow) {
      result.publishedWorkflow = savedWorkflow;
    }
    return result;
  }

  async setActive(
    workflowId: string,
    id: string,
    user: User,
  ): Promise<Workflow> {
    const workflow = await this.workflowRepository.findOne({
      where: { id: workflowId },
      relations: ['activeVersion', 'versions'],
    });

    if (!workflow) {
      throw new NotFoundException(`Workflow with ID ${workflowId} not found`);
    }

    const version = workflow.versions.find((v) => v.id === id);

    if (!version) {
      throw new NotFoundException(
        `Version with ID ${id} not found in workflow ${workflowId}`,
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
