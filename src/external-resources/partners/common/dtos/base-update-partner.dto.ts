import { PartialType } from '@nestjs/mapped-types';
import { BaseCreatePartnerDto } from './';

/**
 * This is the base DTO class for partner update.
 * DTOs extending this class should use PickType from @nestjs/mapped-types to select the properties they need. They are responsible for defining validation rules for the presence of the properties they pick using @IsNotEmpty() / @IsOptional()
 */

export class BaseUpdatePartnerDto extends PartialType(BaseCreatePartnerDto) {}
