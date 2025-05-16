import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ExternalUsersService } from './external-users.service';

const httpConfig = {
  baseURL: process.env.FASTT_OASIS_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer TOKEN FROM MS OAUTH PROCESS`,
  },
};

@Module({
  imports: [HttpModule.register(httpConfig)],
  providers: [ExternalUsersService],
  exports: [ExternalUsersService],
})
export class ExternalUsersModule {}
