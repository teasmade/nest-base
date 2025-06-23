import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkflowMappingDto } from './create-workflow-mapping.dto';

export class UpdateWorkflowMappingDto extends PartialType(
  CreateWorkflowMappingDto,
) {}
