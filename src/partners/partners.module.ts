import { Module } from '@nestjs/common';
import { PartnersController } from './partners.controller';
import { PartnersService } from './partners.service';
import { OasisModule } from 'src/oasis/oasis.module';

@Module({
  imports: [OasisModule],
  controllers: [PartnersController],
  providers: [PartnersService],
})
export class PartnersModule {}
