import { IsString, IsUUID, IsOptional } from 'class-validator';
import { Exclude } from 'class-transformer';

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

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
}
