import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { OasisModule } from '@oasis/oasis.module';

@Module({
  imports: [OasisModule],
  controllers: [ContactsController],
  providers: [ContactsService],
})
export class ContactsModule {}
