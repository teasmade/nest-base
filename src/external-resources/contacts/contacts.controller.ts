import {
  Controller,
  Get,
  Post,
  Query,
  Param,
  Body,
  UseInterceptors,
  ValidationPipe,
  Patch,
} from '@nestjs/common';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import {
  GetContactsDto,
  GetContactsQueryParamsDTO,
  GetContactDto,
  CreateContactDto,
  UpdateContactDto,
} from './dtos';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get()
  async getContacts(
    @Query(new ValidationPipe({ transform: true, whitelist: true }))
    getContactsQueryParams?: GetContactsQueryParamsDTO,
  ): Promise<GetContactsDto> {
    return this.contactsService.getContacts(getContactsQueryParams);
  }

  @Get(':id')
  async getContact(@Param('id') id: string): Promise<GetContactDto> {
    return await this.contactsService.getContact(id);
  }

  @Post()
  async createContact(
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    )
    createContactDto: CreateContactDto,
  ): Promise<string> {
    return await this.contactsService.createContact(createContactDto);
  }

  @Patch(':id')
  async updateContact(
    @Param('id') id: string,
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    updateContactDto: UpdateContactDto,
  ): Promise<string> {
    return await this.contactsService.updateContact(id, updateContactDto);
  }
}
