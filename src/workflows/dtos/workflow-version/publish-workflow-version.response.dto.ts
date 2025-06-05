import { Expose } from 'class-transformer';
import { WorkflowVersion } from '../../entities/workflow-version.entity';

export class PublishWorkflowVersionResponseDto
  implements Partial<WorkflowVersion>
{
  @Expose()
  id: string;

  @Expose()
  isPublished: boolean;

  @Expose()
  updatedAt: Date;
}
