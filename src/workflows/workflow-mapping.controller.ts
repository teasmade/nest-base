import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { WorkflowMappingService } from './workflow-mapping.service';
import {
  CreateWorkflowMappingDto,
  UpdateWorkflowMappingDto,
} from './dtos/workflow-mapping';

@Controller('workflow-mappings')
export class WorkflowMappingController {
  constructor(
    private readonly workflowMappingService: WorkflowMappingService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  create(@Body() dto: CreateWorkflowMappingDto) {
    return this.workflowMappingService.create(dto);
  }

  @Get()
  findAll() {
    return this.workflowMappingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workflowMappingService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  update(@Param('id') id: string, @Body() dto: UpdateWorkflowMappingDto) {
    return this.workflowMappingService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workflowMappingService.remove(id);
  }
}
