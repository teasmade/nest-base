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
} from '@nestjs/common';
import { WorkflowService } from './workflow.service';
import { Workflow } from './entities/workflow.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../users/entities/user.entity';

@Controller('workflows')
@UseGuards(JwtAuthGuard)
export class WorkflowController {
  constructor(private readonly workflowService: WorkflowService) {}

  @Get()
  findAll(): Promise<Partial<Workflow>[]> {
    return this.workflowService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Workflow | null> {
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

  @Post(':id/publish')
  publish(
    @Param('id') id: string,
    @Request() req: { user: User },
  ): Promise<Workflow> {
    return this.workflowService.publish(id, req.user);
  }
}
