import { Injectable } from '@nestjs/common';
import { OasisContactsService } from 'src/oasis/oasis-resources/oasis-contacts/oasis-contacts.service';
import {
  GetContactsDto,
  GetContactsQueryParamsDTO,
  GetContactDto,
  CreateContactDto,
  UpdateContactDto,
} from './dtos';
import { ExternalResourceService } from '../common/base-services/external-resource.service';
import { plainToInstance } from 'class-transformer';
import { OasisCreateContactBody } from '@oasis/oasis-resources/oasis-contacts/interfaces/oasis-create-contact.interface';
import { OasisUpdateContactBody } from '@oasis/oasis-resources/oasis-contacts/interfaces/oasis-update-contact.interface';

@Injectable()
export class ContactsService extends ExternalResourceService {
  constructor(private readonly oasisContactsService: OasisContactsService) {
    super();
  }

  async getContacts(
    getContactsQueryParams?: GetContactsQueryParamsDTO,
  ): Promise<GetContactsDto> {
    const transformedQueryParams = plainToInstance(
      GetContactsQueryParamsDTO,
      getContactsQueryParams,
      { groups: ['transform'] },
    );

    const oasisContacts = await this.oasisContactsService.getOasisContacts(
      transformedQueryParams,
    );

    return this.assignOasisResponseToTransformationDTO(
      oasisContacts,
      GetContactsDto,
    );
  }

  async getContact(id: string): Promise<GetContactDto> {
    const oasisContact = await this.oasisContactsService.getContact(id);

    return this.assignOasisResponseToTransformationDTO(
      oasisContact,
      GetContactDto,
    );
  }

  async createContact(createContactDto: CreateContactDto): Promise<string> {
    const oasisCreateContactBody = this.transformInputDTOToOasisBody<
      OasisCreateContactBody,
      CreateContactDto
    >(createContactDto);

    return await this.oasisContactsService.createContact(
      oasisCreateContactBody,
    );
  }

  async updateContact(
    id: string,
    updateContactDto: UpdateContactDto,
  ): Promise<string> {
    const oasisUpdateContactBody = this.transformInputDTOToOasisBody<
      OasisUpdateContactBody,
      UpdateContactDto
    >(updateContactDto);

    return await this.oasisContactsService.updateContact(
      id,
      oasisUpdateContactBody,
    );
  }
}
