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
} from '@nestjs/common';
import { WorkflowVersionService } from './workflow-version.service';
import { WorkflowVersion } from './entities/workflow-version.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../users/entities/user.entity';
import { Workflow } from '../workflows/entities/workflow.entity';

@Controller('workflows/:workflowId/versions')
@UseGuards(JwtAuthGuard)
export class WorkflowVersionController {
  constructor(private readonly versionService: WorkflowVersionService) {}

  @Get()
  findAll(@Param('workflowId') workflowId: string): Promise<WorkflowVersion[]> {
    return this.versionService.findAll(workflowId);
  }

  @Get(':id')
  findOne(
    @Param('workflowId') workflowId: string,
    @Param('id') id: string,
  ): Promise<WorkflowVersion> {
    return this.versionService.findOne(workflowId, id);
  }

  @Post()
  create(
    @Param('workflowId') workflowId: string,
    @Body() createVersionDto: Partial<WorkflowVersion>,
    @Request() req: { user: User },
  ): Promise<WorkflowVersion> {
    return this.versionService.create(workflowId, createVersionDto, req.user);
  }

  @Patch(':id')
  update(
    @Param('workflowId') workflowId: string,
    @Param('id') id: string,
    @Body() updateVersionDto: Partial<WorkflowVersion>,
    @Request() req: { user: User },
  ): Promise<WorkflowVersion> {
    return this.versionService.update(
      workflowId,
      id,
      updateVersionDto,
      req.user,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('workflowId') workflowId: string,
    @Param('id') id: string,
  ): Promise<void> {
    return this.versionService.remove(workflowId, id);
  }

  @Post(':id/publish')
  publish(
    @Param('workflowId') workflowId: string,
    @Param('id') id: string,
    @Request() req: { user: User },
  ): Promise<{
    publishedVersion: WorkflowVersion;
    publishedWorkflow?: Workflow;
  }> {
    return this.versionService.publish(workflowId, id, req.user);
  }

  @Post(':id/activate')
  activate(
    @Param('workflowId') workflowId: string,
    @Param('id') id: string,
    @Request() req: { user: User },
  ): Promise<Workflow> {
    return this.versionService.setActive(workflowId, id, req.user);
  }
}
