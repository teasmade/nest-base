import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OasisController } from './oasis.controller';
import { OasisUsersService } from './oasis-users/oasis-users.service';
import { OasisAccountsService } from './oasis-accounts/oasis-accounts.service';
import { OasisAuthService } from './oasis-auth/oasis-auth.service';
import { OasisHttpService } from './oasis-auth/oasis-http.service';

@Module({
  imports: [HttpModule],
  providers: [
    OasisAuthService,
    OasisHttpService,
    OasisUsersService,
    OasisAccountsService,
  ],
  exports: [
    OasisAuthService,
    OasisHttpService,
    OasisUsersService,
    OasisAccountsService,
  ],
  controllers: [OasisController],
})
export class OasisModule {}
