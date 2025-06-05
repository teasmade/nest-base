import { Expose } from 'class-transformer';
import { Workflow } from '../../entities/workflow.entity';

export class PublishWorkflowResponseDto implements Partial<Workflow> {
  @Expose()
  id: string;

  @Expose()
  isPublished: boolean;

  @Expose()
  updatedAt: Date;
}
