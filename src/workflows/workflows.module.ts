import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workflow } from './entities/workflow.entity';
import { WorkflowVersion } from './entities/workflow-version.entity';
import { WorkflowMapping } from './entities/workflow-mapping.entity';
import { WorkflowController } from './workflow.controller';
import { WorkflowVersionController } from './workflow-version.controller';
import { WorkflowMappingController } from './workflow-mapping.controller';
import { WorkflowService } from './workflow.service';
import { WorkflowVersionService } from './workflow-version.service';
import { WorkflowMappingService } from './workflow-mapping.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Workflow, WorkflowVersion, WorkflowMapping]),
    UsersModule,
  ],
  controllers: [
    WorkflowController,
    WorkflowVersionController,
    WorkflowMappingController,
  ],
  providers: [WorkflowService, WorkflowVersionService, WorkflowMappingService],
  exports: [WorkflowMappingService],
})
export class WorkflowsModule {}
