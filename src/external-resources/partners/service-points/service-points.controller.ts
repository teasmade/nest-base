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
import { ClassSerializerInterceptor, SerializeOptions } from '@nestjs/common';
import { ServicePointsService } from './service-points.service';
import {
  GetServicePointsDto,
  GetServicePointDto,
  GetServicePointQueryParamsDTO,
  CreateServicePointDto,
  UpdateServicePointDto,
} from './dtos';

@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({
  excludeExtraneousValues: true,
})
@Controller('service-points')
export class ServicePointsController {
  constructor(private readonly servicePointsService: ServicePointsService) {}

  @Get()
  async getServicePoints(
    // Whitelist will strip out any properties that are not in the DTO
    @Query(new ValidationPipe({ transform: true, whitelist: true }))
    getServicePointQueryParams?: GetServicePointQueryParamsDTO,
  ): Promise<GetServicePointsDto> {
    return this.servicePointsService.getServicePoints(
      getServicePointQueryParams,
    );
  }

  @Get(':id')
  async getServicePoint(@Param('id') id: string): Promise<GetServicePointDto> {
    return await this.servicePointsService.getServicePoint(id);
  }

  @Post()
  async createServicePoint(
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    )
    createServicePointDto: CreateServicePointDto,
  ): Promise<string> {
    return await this.servicePointsService.createServicePoint(
      createServicePointDto,
    );
  }

  @Patch(':id')
  async updateServicePoint(
    @Param('id') id: string,
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    updateServicePointDto: UpdateServicePointDto,
  ): Promise<string> {
    return await this.servicePointsService.updateServicePoint(
      id,
      updateServicePointDto,
    );
  }
}
