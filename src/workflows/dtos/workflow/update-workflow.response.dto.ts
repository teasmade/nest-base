import { Expose } from 'class-transformer';
import { Workflow } from '../../entities/workflow.entity';

export class UpdateWorkflowResponseDto implements Partial<Workflow> {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  updatedAt: Date;
}
