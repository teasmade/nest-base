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
import { WorkflowService } from './workflow.service';
import { Workflow } from './entities/workflow.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthUser } from '../auth/interfaces';
import { WorkflowVersion } from './entities/workflow-version.entity';
import {
  CreateWorkflowDto,
  CreateWorkflowResponseDto,
  UpdateWorkflowDto,
  UpdateWorkflowResponseDto,
  PublishWorkflowResponseDto,
  SetActiveVersionDto,
  SetActiveVersionResponseDto,
} from './dtos/workflow';

// TODO: role based guards
@Controller('workflows')
@UseGuards(JwtAuthGuard)
export class WorkflowController {
  constructor(private readonly workflowService: WorkflowService) {}

  @Get()
  findAll(): Promise<Partial<Workflow>[]> {
    // Example of returning subset of fields via TypeORM select clause
    return this.workflowService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Workflow | null> {
    // Example of returning all first level relation via TypeORM
    return this.workflowService.findOne(id);
  }

  @Post()
  create(
    @Body(new ValidationPipe())
    createWorkflowDto: CreateWorkflowDto,
    @Request() req: { user: AuthUser },
  ): Promise<CreateWorkflowResponseDto> {
    // Example of cascading entity creation, with return DTO  transformation to only expose relevant fields to the client
    return this.workflowService.create(createWorkflowDto, req.user);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(new ValidationPipe({ whitelist: true }))
    updateWorkflowDto: UpdateWorkflowDto,
    @Request() req: { user: AuthUser },
  ): Promise<UpdateWorkflowResponseDto> {
    return this.workflowService.update(id, updateWorkflowDto, req.user);
  }

  @Patch(':id/publish')
  publish(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Request() req: { user: AuthUser },
  ): Promise<PublishWorkflowResponseDto> {
    return this.workflowService.publish(id, req.user);
  }

  @Patch(':id/unpublish')
  unpublish(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Request() req: { user: AuthUser },
  ): Promise<PublishWorkflowResponseDto> {
    return this.workflowService.unpublish(id, req.user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.workflowService.softRemove(id);
  }

  @Patch(':id/restore')
  restore(@Param('id', new ParseUUIDPipe()) id: string): Promise<Workflow> {
    return this.workflowService.restore(id);
  }

  // Get active version of a workflow
  @Get(':id/active-version')
  getActiveVersion(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<WorkflowVersion> {
    return this.workflowService.getActiveVersion(id);
  }

  // Set active version of a workflow
  @Patch(':id/active-version')
  setActiveVersion(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(new ValidationPipe()) setActiveVersionDto: SetActiveVersionDto,
    @Request() req: { user: AuthUser },
  ): Promise<SetActiveVersionResponseDto> {
    return this.workflowService.setActiveVersion(
      id,
      setActiveVersionDto,
      req.user,
    );
  }

  @Get(':id/deleted-versions')
  getDeletedVersions(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<WorkflowVersion[]> {
    return this.workflowService.findDeletedVersions(id);
  }
}
