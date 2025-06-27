import { OasisBind } from '@oasis/oasis-common/decorators/oasis-input-bind.decorator';
import {
  AccountTypeCodes,
  RentalStructureTypeCodes,
  ServicePointTypeCodes,
  VehicleTypeCodes,
} from '@oasis/oasis-common/enums/accounts.enum';
import {
  IsString,
  IsEnum,
  IsNumber,
  IsEmail,
  ValidateIf,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  ExposeForRename,
  Rename,
} from 'src/external-resources/common/decorators';

/**
 * Background:This DTO uses a combination of `@ExposeForRename`	 and `@Rename` decorators to handle validation and transformation in two steps. The transformation is to convert property names to match the requirements of the OASIS OData API.
 *
 * - Validation is performed as usual on the controller method with a validation pipe. At this step ExposeForRename uses the `@Expose({ toClassOnly: true })` decorator to expose the domain model property names (e.g. `partner_name`) and exclude the OASIS property names.
 *
 * - The controller calls the partner service, which converts the DTO using `instanceToPlain()` to a plain object. At this step Rename uses the `@Expose({ toPlainOnly: true })` decorator to expose the target OASIS property names `@Transform` to map them to the domain model property values. Domain model property names are excluded with `@Exclude({ toPlainOnly: true })`.
 *
 */

/**
 * This is the base DTO class for partner creation, it's responsible for input value validation and mapping to Oasis property names. It's the reference for all fields that we potentially need to create / update that exist on the Account entity in Oasis.
 * DTOs extending this class should use PickType from @nestjs/mapped-types to select the properties they need. They are responsible for defining validation rules for the presence of the properties they pick using @IsNotEmpty() / @IsOptional()
 */

export class BaseCreatePartnerDto {
  @IsString()
  @ExposeForRename()
  partner_name: string;
  @Rename('partner_name')
  name: string;

  @Type(() => Number)
  @IsEnum(AccountTypeCodes)
  @ExposeForRename()
  account_type_code: number;
  @Rename('account_type_code')
  cap_typecode: number;

  // Rental Structure Types only apply if we're creating a Vehicle Location type service point
  @ValidateIf(
    (object: BaseCreatePartnerDto) =>
      object.service_point_type_code ===
      (ServicePointTypeCodes.LocationVehicule as number),
  )
  @Type(() => Number)
  @IsEnum(RentalStructureTypeCodes)
  @ExposeForRename()
  rental_structure_type_code: number;
  @Rename('rental_structure_type_code')
  cap_typedepartenairepointgeocode: number;

  @Type(() => Number)
  @IsEnum(ServicePointTypeCodes)
  @ExposeForRename()
  service_point_type_code: number;
  @Rename('service_point_type_code')
  cap_typedepointdegeolocalisationcode: number;

  @Type(() => Number)
  @IsEnum(VehicleTypeCodes)
  @ExposeForRename()
  vehicle_type_code: number;
  @Rename('vehicle_type_code')
  cap_typevehiculecode: number;

  @IsString()
  @ExposeForRename()
  parent_oasis_id: string;
  @Rename('parent_oasis_id')
  @OasisBind('accounts')
  'cap_Partenaireparentid@odata.bind': string;

  @IsString()
  @IsEmail()
  @ExposeForRename()
  email: string;
  @Rename('email')
  emailaddress3: string;

  @IsString()
  @ExposeForRename()
  address_line1: string;
  @Rename('address_line1')
  address1_line1: string;

  @IsString()
  @ExposeForRename()
  address_line2: string;
  @Rename('address_line2')
  address1_line2: string;

  @IsString()
  @ExposeForRename()
  address_line3: string;
  @Rename('address_line3')
  address1_line3: string;

  @IsString()
  @ExposeForRename()
  city: string;
  @Rename('city')
  address1_city: string;

  @IsString()
  @ExposeForRename()
  departement: string;
  @Rename('departement')
  address1_stateorprovince: string;

  @IsString()
  @ExposeForRename()
  postal_code: string;
  @Rename('postal_code')
  address1_postalcode: string;

  @IsString()
  @ExposeForRename()
  country: string;
  @Rename('country')
  address1_country: string;

  @IsString()
  @ExposeForRename()
  siret: string;
  @Rename('siret')
  cap_siret: string;

  @IsString()
  @ExposeForRename()
  tva: string;
  @Rename('tva')
  cap_numtva: string;

  @IsString()
  @ExposeForRename()
  opening_hours: string;
  @Rename('opening_hours')
  cap_horairesdouverture: string;

  @IsNumber()
  @ExposeForRename()
  max_car_price: number;
  @Rename('max_car_price')
  cap_coutmaximumvoiture: number;

  @IsNumber()
  @ExposeForRename()
  max_bike_price: number;
  @Rename('max_bike_price')
  cap_coutmaximum2roues: number;

  @IsNumber()
  @ExposeForRename()
  car_deposit: number;
  @Rename('car_deposit')
  cap_montantcautionvoiture: number;

  @IsNumber()
  @ExposeForRename()
  bike_deposit: number;
  @Rename('bike_deposit')
  cap_montantcaution2roues: number;

  @IsString()
  @ExposeForRename()
  zone_of_intervention: string;
  @Rename('zone_of_intervention')
  cap_zonedintervention: string;

  @IsString()
  @ExposeForRename()
  unavailable_start_date: string;
  @Rename('unavailable_start_date')
  cap_date_debut_indisponibilite: string;

  @IsString()
  @ExposeForRename()
  unavailable_end_date: string;
  @Rename('unavailable_end_date')
  cap_date_fin_indisponibilite: string;
}
