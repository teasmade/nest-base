import { Controller, Get } from '@nestjs/common';
import { OasisContactsService } from './oasis-contacts/oasis-contacts.service';
import { OasisAccountsService } from './oasis-accounts/oasis-accounts.service';

@Controller('oasis')
export class OasisController {
  constructor(
    private readonly oasisContactsService: OasisContactsService,
    private readonly oasisAccountsService: OasisAccountsService,
  ) {}

  @Get('contacts')
  async getContacts() {
    return this.oasisContactsService.getOasisContacts();
  }

  @Get('accounts')
  async getAccounts() {
    return this.oasisAccountsService.getOasisAccounts();
  }
}
