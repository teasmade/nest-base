import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import {
  ExposeForRename,
  Rename,
} from 'src/external-resources/common/decorators';

/**
 * This DTO uses a combination of `@ExposeForRename`	 and `@Rename` decorators to handle validation and transformation in two steps. The transformation is to convert property names to match the requirements of the OASIS OData API.
 *
 * - Validation is performed as usual on the controller method with a validation pipe. At this step ExposeForRename uses the `@Expose({ toClassOnly: true })` decorator to expose the domain model property names (e.g. `partner_name`) and exclude the OASIS property names.
 *
 * - The controller calls the partner service, which converts the DTO using `instanceToPlain()` to a plain object. At this step Rename uses the `@Expose({ toPlainOnly: true })` decorator to expose the target OASIS property names `@Transform` to map them to the domain model property values. Domain model property names are excluded with `@Exclude({ toPlainOnly: true })`.
 *
 */

export class CreatePartnerDto {
  @IsString()
  @IsNotEmpty()
  @ExposeForRename()
  partner_name: string;
  @Rename('partner_name')
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @ExposeForRename()
  partner_type_code: number;
  @Rename('partner_type_code')
  cap_typedepartenairepointgeocode: number;

  @IsNumber()
  @IsNotEmpty()
  @ExposeForRename()
  partner_category_code: number;
  @Rename('partner_category_code')
  cap_typedepointdegeolocalisationcode: number;

  @IsString()
  @IsNotEmpty()
  @ExposeForRename()
  email: string;
  @Rename('email')
  emailaddress3: string;

  @IsString()
  @IsNotEmpty()
  @ExposeForRename()
  address_line1: string;
  @Rename('address_line1')
  address1_line1: string;

  @IsString()
  @IsNotEmpty()
  @ExposeForRename()
  city: string;
  @Rename('city')
  address1_city: string;

  @IsString()
  @IsNotEmpty()
  @ExposeForRename()
  departement: string;
  @Rename('departement')
  address1_stateorprovince: string;

  @IsString()
  @IsNotEmpty()
  @ExposeForRename()
  postal_code: string;
  @Rename('postal_code')
  address1_postalcode: string;

  @IsString()
  @IsNotEmpty()
  @ExposeForRename()
  country: string;
  @Rename('country')
  address1_country: string;
}
