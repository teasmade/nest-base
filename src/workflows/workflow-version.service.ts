import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { WorkflowVersion } from './entities/workflow-version.entity';
import { Workflow } from './entities/workflow.entity';
import { AuthUser } from 'src/auth/interfaces';
import { UsersService } from 'src/users/users.service';
import {
  CreateWorkflowVersionDto,
  CreateWorkflowVersionResponseDto,
  UpdateWorkflowVersionDto,
  UpdateWorkflowVersionResponseDto,
  PublishWorkflowVersionResponseDto,
} from './dtos/workflow-version';

@Injectable()
export class WorkflowVersionService {
  constructor(
    @InjectRepository(WorkflowVersion)
    private versionRepository: Repository<WorkflowVersion>,
    @InjectRepository(Workflow)
    private workflowRepository: Repository<Workflow>,
    private usersService: UsersService,
  ) {}

  // async findAll(workflowId: string): Promise<WorkflowVersion[]> {
  //   return this.versionRepository.find({
  //     where: { workflow: { id: workflowId } },
  //     relations: ['workflow', 'createdBy', 'updatedBy'],
  //   });
  // }

  async findOne(workflowId: string, id: string): Promise<WorkflowVersion> {
    const version = await this.versionRepository.findOne({
      where: { id, workflow: { id: workflowId } },
      relations: ['workflow'],
    });

    if (!version) {
      throw new NotFoundException(
        `Workflow version ${id} not found in workflow ${workflowId}`,
      );
    }

    return version;
  }

  async create(
    workflowId: string,
    createVersionDto: CreateWorkflowVersionDto,
    authUser: AuthUser,
  ): Promise<CreateWorkflowVersionResponseDto> {
    const user = await this.usersService.findByAuthUserId(authUser.id);

    const workflow = await this.workflowRepository.findOne({
      where: { id: workflowId },
    });

    if (!workflow) {
      throw new NotFoundException(`Workflow ${workflowId} not found`);
    }

    if (!createVersionDto.description) {
      createVersionDto.description = `Version ${createVersionDto.version} pour ${workflow.name}`;
    }

    Object.assign(workflow, {
      updatedBy: user,
    });

    const version = this.versionRepository.create({
      ...createVersionDto,
      createdBy: user,
      updatedBy: user,
      workflow,
    });

    const savedVersion = await this.versionRepository.save(version);

    return plainToInstance(CreateWorkflowVersionResponseDto, savedVersion, {
      excludeExtraneousValues: true,
    });
  }

  async update(
    workflowId: string,
    id: string,
    updateVersionDto: UpdateWorkflowVersionDto,
    authUser: AuthUser,
  ): Promise<UpdateWorkflowVersionResponseDto> {
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

    const version = await this.versionRepository.findOne({
      where: { id, workflow: { id: workflowId } },
    });

    if (!version) {
      throw new NotFoundException(
        `Workflow version ${id} not found in workflow ${workflowId}`,
      );
    }

    Object.assign(version, {
      ...updateVersionDto,
      updatedBy: authUser.id,
    });

    const savedVersion = await this.versionRepository.save(version);

    return plainToInstance(UpdateWorkflowVersionResponseDto, savedVersion, {
      excludeExtraneousValues: true,
    });
  }

  async publish(
    workflowId: string,
    id: string,
    authUser: AuthUser,
  ): Promise<PublishWorkflowVersionResponseDto> {
    const version = await this.versionRepository.findOne({
      where: { id, workflow: { id: workflowId } },
    });

    if (!version) {
      throw new NotFoundException(
        `Workflow version ${id} not found in workflow ${workflowId}`,
      );
    }

    Object.assign(version, {
      isPublished: true,
      updatedBy: authUser.id,
    });

    const publishedVersion = await this.versionRepository.save(version);

    return plainToInstance(
      PublishWorkflowVersionResponseDto,
      publishedVersion,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async unpublish(
    workflowId: string,
    id: string,
    authUser: AuthUser,
  ): Promise<PublishWorkflowVersionResponseDto> {
    const version = await this.versionRepository.findOne({
      where: { id, workflow: { id: workflowId } },
      relations: ['workflow', 'workflow.activeVersion'],
    });

    if (!version) {
      throw new NotFoundException(
        `Workflow version ${id} not found in workflow ${workflowId}`,
      );
    }

    // Cannot unpublish a version if it is the active version
    if (version.workflow.activeVersion?.id === id) {
      throw new BadRequestException(
        `This version is the active version of the workflow, cannot unpublish`,
      );
    }

    Object.assign(version, {
      isPublished: false,
      updatedBy: authUser.id,
    });

    const unpublishedVersion = await this.versionRepository.save(version);

    return plainToInstance(
      PublishWorkflowVersionResponseDto,
      unpublishedVersion,
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async softRemove(workflowId: string, id: string): Promise<void> {
    const version = await this.versionRepository.findOne({
      where: { id, workflow: { id: workflowId } },
      relations: ['workflow', 'workflow.activeVersion'],
    });

    if (!version) {
      throw new NotFoundException(
        `Workflow version ${id} not found in workflow ${workflowId}`,
      );
    }

    if (version.workflow.activeVersion?.id === id) {
      throw new BadRequestException(
        `This version is the active version of the workflow, cannot delete`,
      );
    }

    if (version.isPublished) {
      throw new BadRequestException(
        `Version ${id} is published, cannot delete`,
      );
    }

    try {
      await this.versionRepository.softRemove(version);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
  }

  async restore(workflowId: string, id: string): Promise<WorkflowVersion> {
    const version = await this.versionRepository.findOne({
      where: { id, workflow: { id: workflowId } },
      relations: ['workflow'],
      withDeleted: true,
    });

    if (!version) {
      throw new NotFoundException(
        `Workflow version ${id} not found in workflow ${workflowId}`,
      );
    }

    if (!version.deletedAt) {
      throw new BadRequestException(`Workflow version ${id} is not deleted`);
    }

    try {
      await this.versionRepository.restore({ id });
      return this.findOne(workflowId, id);
    } catch (error) {
      // TODO: handle error in proper logging service, sentry etc.
      console.error(error);
      throw new InternalServerErrorException();
    }
  }
}
