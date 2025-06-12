import {
  Controller,
  Get,
  Query,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { DemandesService } from './demandes.service';
import { GetDemandesQueryParamsDTO, GetDemandesDto } from './dtos';

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
}
