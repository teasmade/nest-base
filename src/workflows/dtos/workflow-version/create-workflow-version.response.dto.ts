import { Expose } from 'class-transformer';
import { WorkflowVersion } from '../../entities/workflow-version.entity';

export class CreateWorkflowVersionResponseDto
  implements Partial<WorkflowVersion>
{
  @Expose()
  id: string;

  @Expose()
  version: string;

  @Expose()
  description: string;

  @Expose()
  isPublished: boolean;

  @Expose()
  definition: Record<string, unknown>;
}
