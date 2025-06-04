import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workflow } from './entities/workflow.entity';
import { WorkflowVersion } from './entities/workflow-version.entity';
import { WorkflowController } from './workflow.controller';
import { WorkflowVersionController } from './workflow-version.controller';
import { WorkflowService } from './workflow.service';
import { WorkflowVersionService } from './workflow-version.service';

@Module({
  imports: [TypeOrmModule.forFeature([Workflow, WorkflowVersion])],
  controllers: [WorkflowController, WorkflowVersionController],
  providers: [WorkflowService, WorkflowVersionService],
})
export class WorkflowsModule {}
