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
import { WorkflowVersionService } from './workflow-version.service';
import { WorkflowVersion } from './entities/workflow-version.entity';
import { AuthUser } from 'src/auth/interfaces';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  CreateWorkflowVersionDto,
  CreateWorkflowVersionResponseDto,
  UpdateWorkflowVersionDto,
  UpdateWorkflowVersionResponseDto,
  PublishWorkflowVersionResponseDto,
} from './dtos/workflow-version';

// TODO: role based guards
@Controller('workflows/:workflowId/versions')
@UseGuards(JwtAuthGuard)
export class WorkflowVersionController {
  constructor(private readonly versionService: WorkflowVersionService) {}

  // TODCHECK: don't think we ever need to get all versions of a workflow independently of the parent workflow
  // @Get()
  // findAll(
  //   @Param('workflowId', new ParseUUIDPipe()) workflowId: string,
  // ): Promise<WorkflowVersion[]> {
  //   return this.versionService.findAll(workflowId);
  // }

  @Get(':id')
  findOne(
    @Param('workflowId', new ParseUUIDPipe()) workflowId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<WorkflowVersion> {
    return this.versionService.findOne(workflowId, id);
  }

  @Post()
  create(
    @Param('workflowId', new ParseUUIDPipe()) workflowId: string,
    @Body(new ValidationPipe()) createVersionDto: CreateWorkflowVersionDto,
    @Request() req: { user: AuthUser },
  ): Promise<CreateWorkflowVersionResponseDto> {
    return this.versionService.create(workflowId, createVersionDto, req.user);
  }

  @Patch(':id')
  update(
    @Param('workflowId', new ParseUUIDPipe()) workflowId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(new ValidationPipe()) updateVersionDto: UpdateWorkflowVersionDto,
    @Request() req: { user: AuthUser },
  ): Promise<UpdateWorkflowVersionResponseDto> {
    return this.versionService.update(
      workflowId,
      id,
      updateVersionDto,
      req.user,
    );
  }

  @Patch(':id/publish')
  publish(
    @Param('workflowId', new ParseUUIDPipe()) workflowId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Request() req: { user: AuthUser },
  ): Promise<PublishWorkflowVersionResponseDto> {
    return this.versionService.publish(workflowId, id, req.user);
  }

  @Patch(':id/unpublish')
  unpublish(
    @Param('workflowId', new ParseUUIDPipe()) workflowId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Request() req: { user: AuthUser },
  ): Promise<PublishWorkflowVersionResponseDto> {
    return this.versionService.unpublish(workflowId, id, req.user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('workflowId', new ParseUUIDPipe()) workflowId: string,
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<void> {
    return this.versionService.remove(workflowId, id);
  }
}
