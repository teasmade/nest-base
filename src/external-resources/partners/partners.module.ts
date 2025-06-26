import { Module } from '@nestjs/common';
import { PartnersController } from './partners.controller';
import { PartnersService } from './partners.service';
import { OasisModule } from 'src/oasis/oasis.module';
import { ServicePointsController } from './service-points/service-points.controller';
import { ServicePointsService } from './service-points/service-points.service';

@Module({
  imports: [OasisModule],
  controllers: [PartnersController, ServicePointsController],
  providers: [PartnersService, ServicePointsService],
})
export class PartnersModule {}
