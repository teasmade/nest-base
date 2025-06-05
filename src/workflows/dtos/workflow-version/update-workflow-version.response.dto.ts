import { Expose } from 'class-transformer';
import { WorkflowVersion } from '../../entities/workflow-version.entity';

export class UpdateWorkflowVersionResponseDto
  implements Partial<WorkflowVersion>
{
  @Expose()
  id: string;

  @Expose()
  version: string;

  @Expose()
  description: string;

  @Expose()
  definition: Record<string, unknown>;

  @Expose()
  updatedAt: Date;
}
