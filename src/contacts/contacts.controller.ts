import {
  Controller,
  Get,
  Query,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { TransformedOasisResponse } from 'src/oasis/oasis-common/interfaces';
import { OasisContactToContactDto } from './dtos/oasis-contact-to-contact.dto';
import { ContactQueryParamsDTO } from './dtos/contact-query-params.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get()
  async getContacts(
    // @Query('pageSize') pageSize?: number,
    // @Query('paginationSessionId') paginationSessionId?: string,
    // @Query('direction') direction?: 'next' | 'prev',
    @Query(new ValidationPipe({ transform: true }))
    getContactsQueryParams?: ContactQueryParamsDTO,
  ): Promise<TransformedOasisResponse<OasisContactToContactDto>> {
    return this.contactsService.getContacts(getContactsQueryParams);
  }
}
