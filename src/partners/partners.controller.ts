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

  // TOCHECK - how does this precisely work???
  // @SerializeOptions({
  //   type: OasisAccountToPartnerDto,
  // })
  @Get()
  async getPartners(
    @Query('pageSize') pageSize?: number,
    @Query('paginationSessionId') paginationSessionId?: string,
    @Query('direction') direction?: 'next' | 'prev',
  ) {
    return this.partnersService.getPartners(
      pageSize,
      paginationSessionId,
      direction,
    );
  }
}
