import { IsString, IsUUID, IsDate, IsOptional } from 'class-validator';

export class WorkflowMappingResponseDto {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsString()
  label: string;

  @IsString()
  description: string;

  @IsUUID()
  @IsOptional()
  workflowId: string | null;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
