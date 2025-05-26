import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { PartnersService } from './partners.service';
import { TransformedOasisResponse } from 'src/oasis/oasis-common/interfaces';
import { OasisAccountToPartnerDto } from './dtos/oasis-account-to-partner.dto';
import {
  AccountTypes,
  AccountsCategories,
} from 'src/oasis/oasis-common/enums/accounts.enum';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('partners')
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  @Get()
  async getPartners(
    @Query('pageSize') pageSize?: number,
    @Query('paginationSessionId') paginationSessionId?: string,
    @Query('direction') direction?: 'next' | 'prev',
    @Query('type') type?: AccountTypes,
    @Query('category') category?: AccountsCategories,
  ): Promise<TransformedOasisResponse<OasisAccountToPartnerDto>> {
    return this.partnersService.getPartners(
      pageSize,
      paginationSessionId,
      direction,
      type,
      category,
    );
  }
}
