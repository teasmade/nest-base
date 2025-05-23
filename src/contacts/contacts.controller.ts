import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { TransformedOasisResponse } from 'src/oasis/oasis-common/interfaces';
import { OasisContactToContactDto } from './dtos/oasis-contact-to-contact.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get()
  async getContacts(
    @Query('pageSize') pageSize?: number,
    @Query('paginationSessionId') paginationSessionId?: string,
    @Query('direction') direction?: 'next' | 'prev',
  ): Promise<TransformedOasisResponse<OasisContactToContactDto>> {
    return this.contactsService.getContacts(
      pageSize,
      paginationSessionId,
      direction,
    );
  }
}
