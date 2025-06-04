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
import { WorkflowService } from './workflow.service';
import { Workflow } from './entities/workflow.entity';
import { WorkflowVersion } from './entities/workflow-version.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../users/entities/user.entity';

@Controller('workflows')
@UseGuards(JwtAuthGuard)
export class WorkflowController {
  constructor(private readonly workflowService: WorkflowService) {}

  // Workflows

  @Get()
  findAll(): Promise<Workflow[]> {
    return this.workflowService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Workflow> {
    return this.workflowService.findOne(id);
  }

  @Post()
  create(
    @Body() createWorkflowDto: Partial<Workflow>,
    @Request() req: { user: User },
  ): Promise<Workflow> {
    return this.workflowService.create(createWorkflowDto, req.user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWorkflowDto: Partial<Workflow>,
    @Request() req: { user: User },
  ): Promise<Workflow> {
    return this.workflowService.update(id, updateWorkflowDto, req.user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.workflowService.remove(id);
  }

  // Workflow Versions

  @Post(':id/versions')
  createVersion(
    @Param('id') id: string,
    @Body() createVersionDto: Partial<WorkflowVersion>,
    @Request() req: { user: User },
  ): Promise<WorkflowVersion> {
    return this.workflowService.createVersion(id, createVersionDto, req.user);
  }

  @Post(':id/versions/:versionId/publish')
  publishVersion(
    @Param('id') id: string,
    @Param('versionId') versionId: string,
    @Request() req: { user: User },
  ): Promise<WorkflowVersion> {
    return this.workflowService.publishVersion(id, versionId, req.user);
  }

  @Post(':id/versions/:versionId/activate')
  setActiveVersion(
    @Param('id') id: string,
    @Param('versionId') versionId: string,
    @Request() req: { user: User },
  ): Promise<Workflow> {
    return this.workflowService.setActiveVersion(id, versionId, req.user);
  }
}
