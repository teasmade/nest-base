import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateWorkflowMappingDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  label: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsUUID()
  @IsOptional()
  workflowId?: string;
}
