import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { PartnersService } from './partners.service';
import { TransformedOasisResponse } from 'src/oasis/oasis-common/interfaces';
import { OasisAccountToPartnerDto } from './dtos/oasis-account-to-partner.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('partners')
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  @Get()
  async getPartners(
    @Query('pageSize') pageSize?: number,
    @Query('paginationSessionId') paginationSessionId?: string,
    @Query('direction') direction?: 'next' | 'prev',
  ): Promise<TransformedOasisResponse<OasisAccountToPartnerDto>> {
    return this.partnersService.getPartners(
      pageSize,
      paginationSessionId,
      direction,
    );
  }
}
