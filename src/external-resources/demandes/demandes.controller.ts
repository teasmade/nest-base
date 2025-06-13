import {
  Controller,
  Get,
  Param,
  Query,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { DemandesService } from './demandes.service';
import {
  GetDemandesQueryParamsDTO,
  GetDemandesDto,
  GetDemandeDto,
  GetPartnerProximityQueryParamsDTO,
  GetPartnerProximityDto,
} from './dtos';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('demandes')
export class DemandesController {
  constructor(private readonly demandesService: DemandesService) {}

  @Get()
  async getDemandes(
    @Query(new ValidationPipe({ transform: true, whitelist: true }))
    getDemandesQueryParams?: GetDemandesQueryParamsDTO,
  ): Promise<GetDemandesDto> {
    return this.demandesService.getDemandes(getDemandesQueryParams);
  }

  @Get(':id')
  async getDemande(@Param('id') id: string): Promise<GetDemandeDto> {
    return this.demandesService.getDemande(id);
  }

  @Get(':id/partner-proximity')
  async getDemandePartnerProximity(
    @Param('id') id: string,
    @Query(new ValidationPipe({ transform: true, whitelist: true }))
    getPartnerProximityQueryParams?: GetPartnerProximityQueryParamsDTO,
  ): Promise<GetPartnerProximityDto> {
    return this.demandesService.getDemandePartnerProximity(
      id,
      getPartnerProximityQueryParams,
    );
  }
}
