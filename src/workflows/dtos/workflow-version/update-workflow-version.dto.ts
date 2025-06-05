import { IsString, IsOptional, IsObject } from 'class-validator';

export class UpdateWorkflowVersionDto {
  @IsString()
  @IsOptional()
  version?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsObject()
  @IsOptional()
  definition?: Record<string, unknown>;
}
