import { Injectable } from '@nestjs/common';
import { OasisContactsService } from '@oasis/oasis-resources/oasis-contacts/oasis-contacts.service';
import { GetContactsDto } from './dtos/get-contacts.dto';
import { GetContactsQueryParamsDTO } from './dtos/get-contacts-query-params.dto';
import { ExternalResourceService } from '../common/external-resource.service';

@Injectable()
export class ContactsService extends ExternalResourceService {
  constructor(private readonly oasisContactsService: OasisContactsService) {
    super();
  }

  async getContacts(
    getContactsQueryParams?: GetContactsQueryParamsDTO,
  ): Promise<GetContactsDto> {
    const oasisContacts = await this.oasisContactsService.getOasisContacts(
      getContactsQueryParams,
    );
    return this.assignOasisResponseToTransformationDTO(
      oasisContacts,
      GetContactsDto,
    );
  }
}
