import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateWorkflowVersionDto {
  @IsString()
  @IsNotEmpty()
  version: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isPublished?: boolean = false;
}
