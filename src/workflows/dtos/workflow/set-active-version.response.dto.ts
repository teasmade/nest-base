import { Workflow } from '../../entities/workflow.entity';
import { WorkflowVersion } from '../../entities/workflow-version.entity';
import { AssertTypesMatch } from '@common/utils/utility-types';
import { Expose, Type } from 'class-transformer';

type WorkflowResponseShape = {
  id: Workflow['id'];
  name: Workflow['name'];
  description: Workflow['description'];
  isPublished: Workflow['isPublished'];
  activeVersion: Array<{
    id: WorkflowVersion['id'];
    version: WorkflowVersion['version'];
    description: WorkflowVersion['description'];
    definition: WorkflowVersion['definition'];
  }>;
};

// DEVEX: We can use AssertTypesMatch to ensure that we define all and only all properties of the shape in our DTO class composition.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _test: AssertTypesMatch<
  SetActiveVersionResponseDto,
  WorkflowResponseShape
> = true;

class WorkflowVersionResponseDto {
  @Expose()
  id: string;

  @Expose()
  version: string;

  @Expose()
  description: string;

  @Expose()
  definition: Record<string, unknown>;
}

export class SetActiveVersionResponseDto implements WorkflowResponseShape {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  isPublished: boolean;

  @Expose()
  @Type(() => WorkflowVersionResponseDto)
  activeVersion: WorkflowVersionResponseDto[];
}
