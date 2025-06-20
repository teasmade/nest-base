import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, IsNull } from 'typeorm';
import { Workflow } from './entities/workflow.entity';
import { WorkflowVersion } from './entities/workflow-version.entity';
import { AuthUser } from '../auth/interfaces';
import {
  CreateWorkflowDto,
  CreateWorkflowResponseDto,
  UpdateWorkflowDto,
  UpdateWorkflowResponseDto,
  PublishWorkflowResponseDto,
  SetActiveVersionDto,
  SetActiveVersionResponseDto,
} from './dtos/workflow';

@Injectable()
export class WorkflowService {
  constructor(
    @InjectRepository(Workflow)
    private workflowRepository: Repository<Workflow>,
    @InjectRepository(WorkflowVersion)
    private versionRepository: Repository<WorkflowVersion>,
  ) {}

  async findAll(): Promise<Partial<Workflow>[]> {
    // Example of selecting subset of fields via TypeORM
    return this.workflowRepository.find({
      relations: [
        'versions',
        'versions.createdBy',
        'activeVersion',
        'createdBy',
        'updatedBy',
      ],
      select: {
        id: true,
        name: true,
        description: true,
        isPublished: true,
        createdAt: true,
        updatedAt: true,
        activeVersion: {
          id: true,
        },
        createdBy: {
          // id: true,
          email: true,
        },
        updatedBy: {
          // id: true,
          email: true,
        },
        versions: {
          id: true,
          version: true,
          description: true,
          isPublished: true,
          // createdAt: true,
          createdBy: {
            // id: true,
            email: true,
          },
        },
      },
    });
  }

  async findOne(id: string): Promise<Workflow | null> {
    // Example of returning all first level relations via TypeORM
    const workflow = await this.workflowRepository.findOne({
      where: { id },
      relations: ['versions', 'activeVersion', 'createdBy', 'updatedBy'],
    });

    return workflow;
  }

  async create(
    createWorkflowDto: CreateWorkflowDto,
    authUser: AuthUser,
  ): Promise<CreateWorkflowResponseDto> {
    // Example of cascading entity creation, with return DTO  transformation to only expose relevant fields to the client
    const workflow = this.workflowRepository.create({
      ...createWorkflowDto,
      createdBy: { id: authUser.id },
      updatedBy: { id: authUser.id },
      activeVersion: null,
    });

    const savedWorkflow = await this.workflowRepository.save(workflow);

    const startingVersion = this.versionRepository.create({
      version: '1.0.0',
      description: `Version initiale pour ${savedWorkflow.name}`,
      createdBy: { id: authUser.id },
      updatedBy: { id: authUser.id },
      workflow: savedWorkflow,
    });

    const savedVersion = await this.versionRepository.save(startingVersion);

    const savedWorkflowWithStartingVersion = {
      ...savedWorkflow,
      versions: [savedVersion],
    };

    // We use plainToInstance to transform the saved workflow into a DTO that defines the subset of fields we want to return to the client
    return plainToInstance(
      CreateWorkflowResponseDto,
      savedWorkflowWithStartingVersion,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async update(
    id: string,
    updateWorkflowDto: UpdateWorkflowDto,
    user: AuthUser,
  ): Promise<UpdateWorkflowResponseDto> {
    const workflow = await this.findOne(id);

    if (!workflow) {
      throw new NotFoundException(`Workflow ${id} not found`);
    }

    Object.assign(workflow, {
      ...updateWorkflowDto,
      updatedBy: user.id,
    });

    const updatedWorkflow = await this.workflowRepository.save(workflow);

    return plainToInstance(UpdateWorkflowResponseDto, updatedWorkflow, {
      excludeExtraneousValues: true,
    });
  }

  async publish(
    id: string,
    user: AuthUser,
  ): Promise<PublishWorkflowResponseDto> {
    const workflow = await this.findOne(id);

    if (!workflow) {
      throw new NotFoundException(`Workflow ${id} not found`);
    }

    // No checks - can publish any workflow even if it has no active / published versions
    Object.assign(workflow, {
      isPublished: true,
      updatedBy: user.id,
    });

    const publishedWorkflow = await this.workflowRepository.save(workflow);

    return plainToInstance(PublishWorkflowResponseDto, publishedWorkflow, {
      excludeExtraneousValues: true,
    });
  }
  async unpublish(
    id: string,
    user: AuthUser,
  ): Promise<PublishWorkflowResponseDto> {
    const workflow = await this.findOne(id);

    if (!workflow) {
      throw new NotFoundException(`Workflow ${id} not found`);
    }
    // Cannot unpublish a workflow if it has an active version
    if (workflow.activeVersion !== null) {
      throw new BadRequestException(
        `Workflow ${id} has an active version, cannot unpublish`,
      );
    }

    Object.assign(workflow, {
      isPublished: false,
      updatedBy: user.id,
    });

    const publishedWorkflow = await this.workflowRepository.save(workflow);

    return plainToInstance(PublishWorkflowResponseDto, publishedWorkflow, {
      excludeExtraneousValues: true,
    });
  }

  async softRemove(id: string): Promise<void> {
    const workflow = await this.findOne(id);

    if (!workflow) {
      throw new NotFoundException(`Workflow ${id} not found`);
    }

    // Cannot delete a workflow if it has an active version
    if (workflow.activeVersion !== null) {
      throw new BadRequestException(
        `Workflow ${id} has an active version, cannot delete`,
      );
    }

    // Cannot delete a workflow if published
    if (workflow.isPublished) {
      throw new BadRequestException(
        `Workflow ${id} is published, cannot delete`,
      );
    }

    try {
      // First soft remove all versions
      const versions = await this.versionRepository.find({
        where: { workflow: { id } },
      });

      for (const version of versions) {
        await this.versionRepository.softRemove(version);
      }

      // Then soft remove the workflow
      await this.workflowRepository.softRemove(workflow);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  async restore(id: string): Promise<Workflow> {
    const workflow = await this.workflowRepository.findOne({
      where: { id },
      withDeleted: true,
    });

    if (!workflow) {
      throw new NotFoundException(`Workflow ${id} not found`);
    }

    if (!workflow.deletedAt) {
      throw new BadRequestException(`Workflow ${id} is not deleted`);
    }

    try {
      // First restore all versions
      const versions = await this.versionRepository.find({
        where: { workflow: { id } },
        withDeleted: true,
      });

      for (const version of versions) {
        if (version.deletedAt) {
          await this.versionRepository.restore({ id: version.id });
        }
      }

      // Then restore the workflow
      await this.workflowRepository.restore({ id });

      return this.workflowRepository.findOneOrFail({
        where: { id },
        relations: ['versions'],
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  async getActiveVersion(id: string): Promise<WorkflowVersion> {
    const workflow = await this.findOne(id);

    if (!workflow) {
      throw new NotFoundException(`Workflow ${id} not found`);
    }

    if (!workflow.activeVersion) {
      throw new NotFoundException(`Workflow ${id} has no active version`);
    }

    return workflow.activeVersion;
  }

  async setActiveVersion(
    id: string,
    setActiveVersionDto: SetActiveVersionDto,
    authUser: AuthUser,
  ): Promise<SetActiveVersionResponseDto> {
    const workflow = await this.findOne(id);

    if (!workflow) {
      throw new NotFoundException(`Workflow ${id} not found`);
    }

    const version = await this.versionRepository.findOne({
      where: { id: setActiveVersionDto.versionId, workflow: { id } },
    });

    if (!version) {
      throw new NotFoundException(
        `Version ${setActiveVersionDto.versionId} not found in workflow ${id}`,
      );
    }

    if (!version.isPublished) {
      throw new BadRequestException(
        `Version ${setActiveVersionDto.versionId} is not published, cannot set as active`,
      );
    }

    Object.assign(workflow, {
      activeVersion: version,
      updatedBy: authUser.id,
    });

    const updatedWorkflow = await this.workflowRepository.save(workflow);

    return plainToInstance(SetActiveVersionResponseDto, updatedWorkflow, {
      excludeExtraneousValues: true,
    });
  }

  async findDeletedVersions(id: string): Promise<WorkflowVersion[]> {
    const workflow = await this.findOne(id);

    if (!workflow) {
      throw new NotFoundException(`Workflow ${id} not found`);
    }

    return this.versionRepository.find({
      where: {
        workflow: { id },
        deletedAt: Not(IsNull()),
      },
      relations: ['createdBy', 'updatedBy'],
      withDeleted: true,
    });
  }
}
