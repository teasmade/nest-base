import { Injectable } from '@nestjs/common';
import { partnersConfig } from '@oasis/oasis-common/enums/accounts.enum';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getConfig(): object {
    return { config: partnersConfig };
  }
}
