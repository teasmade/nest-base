import { Injectable } from '@nestjs/common';
import { WorkflowMappingService } from './workflows/workflow-mapping.service';
import { partnersConfig } from '@oasis/oasis-common/enums/accounts.enum';
import { contactsConfig } from '@oasis/oasis-common/enums/contacts.enum';

@Injectable()
export class AppService {
  constructor(
    private readonly workflowMappingService: WorkflowMappingService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getConfig(): Promise<object> {
    const workflowMappings = await this.workflowMappingService.findAll();
    return {
      config: { ...partnersConfig, ...contactsConfig, workflowMappings },
    };
  }
}
