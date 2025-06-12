import { Module } from '@nestjs/common';
import { OasisModule } from '@oasis/oasis.module';
import { DemandesService } from './demandes.service';
import { DemandesController } from './demandes.controller';

@Module({
  imports: [OasisModule],
  controllers: [DemandesController],
  providers: [DemandesService],
})
export class DemandesModule {}
