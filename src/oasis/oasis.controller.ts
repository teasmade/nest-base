import { Controller } from '@nestjs/common';
import { OasisContactsService } from './oasis-resources/oasis-contacts/oasis-contacts.service';
import { OasisAccountsService } from './oasis-resources/oasis-accounts/oasis-accounts.service';

@Controller('oasis')
export class OasisController {
  constructor(
    private readonly oasisContactsService: OasisContactsService,
    private readonly oasisAccountsService: OasisAccountsService,
  ) {}
}
