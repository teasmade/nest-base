import { Injectable } from '@nestjs/common';
import { OasisContactsService } from '../oasis/oasis-contacts/oasis-contacts.service';
import { GetContactsResponseDto } from './dtos/contacts-response.dto';

@Injectable()
export class ContactsService {
  constructor(private readonly oasisContactsService: OasisContactsService) {}

  /**
   * Returns an array of contacts mapped from Oasis contacts.
   * @remarks This method should be used with ```@UseInterceptors(ClassSerializerInterceptor)``` decorator on the controller class to ensure correct class-transformer serialization of the response.
   */
  async getContacts(
    pageSize?: number,
    paginationSessionId?: string,
    direction?: 'next' | 'prev',
  ): Promise<GetContactsResponseDto> {
    const oasisContacts = await this.oasisContactsService.getOasisContacts(
      pageSize,
      paginationSessionId,
      direction,
    );

    // Note - we need to return an instance of the DTO class, not a plain old JS object, otherwise class-transformer serialization won't work properly.
    const dto = new GetContactsResponseDto();
    dto.value = oasisContacts.data.value;
    dto.pagination = oasisContacts.pagination;
    return dto;
  }
}
