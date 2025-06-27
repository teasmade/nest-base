import { PartialType } from '@nestjs/mapped-types';
import { CreateServicePointDto } from './create-service-point.dto';

export class UpdateServicePointDto extends PartialType(CreateServicePointDto) {}
