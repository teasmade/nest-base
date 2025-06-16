import { Controller, Get, SerializeOptions } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('config')
  @SerializeOptions({ excludePrefixes: ['targetOasisProperty'] })
  getConfig(): object {
    return this.appService.getConfig();
  }
}
