import { Expose, Type } from 'class-transformer';
import { Workflow } from '../../entities/workflow.entity';
import { WorkflowVersion } from '../../entities/workflow-version.entity';
import { User } from 'src/users/entities/user.entity';
import { AssertTypesMatch } from '@common/utils/utility-types';

// We define the exact shape we want to expose, our exported DTO implements this shape to give us type safety againts our entity definitions.
type WorkflowResponseShape = {
  id: Workflow['id'];
  name: Workflow['name'];
  description: Workflow['description'];
  isPublished: Workflow['isPublished'];
  createdAt: Workflow['createdAt'];
  updatedAt: Workflow['updatedAt'];
  versions: Array<{
    id: WorkflowVersion['id'];
    version: WorkflowVersion['version'];
    description: WorkflowVersion['description'];
    isPublished: WorkflowVersion['isPublished'];
    createdBy: { email: User['email'] };
  }>;
  createdBy: { email: User['email'] };
  updatedBy: { email: User['email'] };
};

// DEVEX: We can use AssertTypesMatch to ensure that we define all and only all properties of the shape in our DTO class composition.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _test: AssertTypesMatch<
  CreateWorkflowResponseDto,
  WorkflowResponseShape
> = true;

class UserResponseDto {
  @Expose()
  email: string;
}

class WorkflowVersionResponseDto {
  @Expose()
  id: string;

  @Expose()
  version: string;

  @Expose()
  description: string;

  @Expose()
  isPublished: boolean;

  @Expose()
  @Type(() => UserResponseDto)
  createdBy: UserResponseDto;
}

export class CreateWorkflowResponseDto implements WorkflowResponseShape {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  isPublished: boolean;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  @Type(() => WorkflowVersionResponseDto)
  versions: WorkflowVersionResponseDto[];

  @Expose()
  @Type(() => UserResponseDto)
  createdBy: UserResponseDto;

  @Expose()
  @Type(() => UserResponseDto)
  updatedBy: UserResponseDto;
}
