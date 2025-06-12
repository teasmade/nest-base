import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OasisController } from './oasis.controller';
import { OasisContactsService } from './oasis-resources/oasis-contacts/oasis-contacts.service';
import { OasisAccountsService } from './oasis-resources/oasis-accounts/oasis-accounts.service';
import { OasisAuthService } from './oasis-common/oasis-auth.service';
import { OasisHttpService } from './oasis-common/oasis-http.service';
import { OasisPaginationService } from './oasis-common/oasis-pagination.service';
import { OasisIncidentsService } from './oasis-resources/oasis-incidents/oasis-incidents.service';

@Module({
  imports: [HttpModule],
  providers: [
    OasisAuthService,
    OasisHttpService,
    OasisPaginationService,
    OasisContactsService,
    OasisAccountsService,
    OasisIncidentsService,
  ],
  exports: [
    OasisAuthService,
    OasisHttpService,
    OasisPaginationService,
    OasisContactsService,
    OasisAccountsService,
    OasisIncidentsService,
  ],
  controllers: [OasisController],
})
export class OasisModule {}
