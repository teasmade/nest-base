import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OasisController } from './oasis.controller';
import { OasisContactsService } from './oasis-contacts/oasis-contacts.service';
import { OasisAccountsService } from './oasis-accounts/oasis-accounts.service';
import { OasisAuthService } from './oasis-common/oasis-auth.service';
import { OasisHttpService } from './oasis-common/oasis-http.service';
import { OasisPaginationService } from './oasis-common/oasis-pagination.service';

@Module({
  imports: [HttpModule],
  providers: [
    OasisAuthService,
    OasisHttpService,
    OasisPaginationService,
    OasisContactsService,
    OasisAccountsService,
  ],
  exports: [
    OasisAuthService,
    OasisHttpService,
    OasisPaginationService,
    OasisContactsService,
    OasisAccountsService,
  ],
  controllers: [OasisController],
})
export class OasisModule {}
