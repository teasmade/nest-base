import {
  Controller,
  Get,
  Post,
  Query,
  Param,
  Body,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { PartnersService } from './partners.service';
import {
  GetPartnersDto,
  GetPartnerDto,
  GetPartnersQueryParamsDTO,
  CreatePartnerDto,
} from './dtos';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('partners')
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  @Get()
  async getPartners(
    @Query(new ValidationPipe({ transform: true }))
    getPartnersQueryParams?: GetPartnersQueryParamsDTO,
  ): Promise<GetPartnersDto> {
    return this.partnersService.getPartners(getPartnersQueryParams);
  }

  @Get(':id')
  async getPartner(@Param('id') id: string): Promise<GetPartnerDto> {
    return await this.partnersService.getPartner(id);
  }

  @Post()
  async createPartner(
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        // ForbidNonWhitelisted returns an error if the body contains properties that are not in the DTO, rather than just silently ignoring them
        // forbidNonWhitelisted: true,
      }),
    )
    createPartnerDto: CreatePartnerDto,
  ): Promise<string> {
    return await this.partnersService.createPartner(createPartnerDto);
  }
}
