import {
  Controller,
  Get,
  Query,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { GetContactsDto, GetContactsQueryParamsDTO } from './dtos';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get()
  async getContacts(
    @Query(new ValidationPipe({ transform: true }))
    getContactsQueryParams?: GetContactsQueryParamsDTO,
  ): Promise<GetContactsDto> {
    return this.contactsService.getContacts(getContactsQueryParams);
  }
}
