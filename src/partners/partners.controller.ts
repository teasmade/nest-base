import {
  Controller,
  Get,
  Query,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { PartnersService } from './partners.service';
import { OasisAccountsService } from 'src/oasis/oasis-accounts/oasis-accounts.service';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { OasisAccountToPartnerDto } from './dtos/oasis-account-to-partner.dto';
@UseInterceptors(ClassSerializerInterceptor)
@Controller('partners')
export class PartnersController {
  constructor(
    private readonly partnersService: PartnersService,
    private readonly oasisAccountsService: OasisAccountsService,
  ) {}

  @SerializeOptions({
    type: OasisAccountToPartnerDto,
  })
  @Get()
  async getPartners(@Query('pageSize') pageSize?: number) {
    return this.partnersService.getPartners(pageSize);
  }
}
