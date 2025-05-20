import { Controller, Get } from '@nestjs/common';
import { OasisUsersService } from './oasis-users/oasis-users.service';
import { OasisAccountsService } from './oasis-accounts/oasis-accounts.service';

@Controller('oasis')
export class OasisController {
  constructor(
    private readonly oasisUsersService: OasisUsersService,
    private readonly oasisAccountsService: OasisAccountsService,
  ) {}

  @Get('users')
  async getUsers() {
    return this.oasisUsersService.getOasisUsers();
  }

  @Get('accounts')
  async getAccounts() {
    return this.oasisAccountsService.getOasisAccounts();
  }
}
