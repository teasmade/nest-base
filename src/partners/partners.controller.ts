import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { PartnersService } from './partners.service';
import { TransformedOasisResponse } from 'src/oasis/oasis-common/interfaces';
import { OasisAccountToPartnerDto } from './dtos/oasis-account-to-partner.dto';
import { PartnerQueryParamsDTO } from './dtos/partner-query-params.dto';
import { CreatePartnerDto } from './dtos/create-partner.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('partners')
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  @Get()
  async getPartners(
    @Query(new ValidationPipe({ transform: true }))
    getPartnersQueryParams?: PartnerQueryParamsDTO,
  ): Promise<TransformedOasisResponse<OasisAccountToPartnerDto>> {
    return this.partnersService.getPartners(getPartnersQueryParams);
  }

  @Post()
  async createPartner(
    @Body(new ValidationPipe({ transform: true }))
    createPartnerDto: CreatePartnerDto,
  ): Promise<string> {
    return await this.partnersService.createPartner(createPartnerDto);
  }
}
