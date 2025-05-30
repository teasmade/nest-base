import { Exclude, Expose } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

/**
 * This DTO uses a combination of `@Expose`	 and `@Exclude` decorators to handle validation and transformation in two steps. The transformation is to convert property names to match the requirements of the OASIS OData API.
 *
 * - Validation is performed as usual on the controller method with a validation pipe. At this step we use the `@Expose({ toClassOnly: true })` decorator to expose the domain model property names (e.g. `partner_name`) and exclude the OASIS property names.
 *
 * - The controller calls the partner service, which converts the DTO using `instanceToPlain()` to a plain object. At this step we use the `@Expose({ toPlainOnly: true })` decorator to expose the target OASIS property names via a getter(e.g. `get name()`) and map them to the domain model property values.Domain model property names are excluded with `@Exclude({ toPlainOnly: true })`.
 *
 */
export class CreatePartnerDto {
  @IsString()
  @IsNotEmpty()
  @Expose({ toClassOnly: true })
  @Exclude({ toPlainOnly: true })
  partner_name: string;

  @Expose({ toPlainOnly: true })
  get name(): string {
    return this.partner_name;
  }

  @IsNumber()
  @IsNotEmpty()
  @Expose({ toClassOnly: true })
  @Exclude({ toPlainOnly: true })
  partner_type_code: number;

  @Expose({ toPlainOnly: true })
  get cap_typedepartenairepointgeocode(): number {
    return this.partner_type_code;
  }

  @IsNumber()
  @IsNotEmpty()
  @Expose({ toClassOnly: true })
  @Exclude({ toPlainOnly: true })
  partner_category_code: number;

  @Expose({ toPlainOnly: true })
  get cap_typedepointdegeolocalisationcode(): number {
    return this.partner_category_code;
  }

  @IsString()
  @IsNotEmpty()
  @Expose({ toClassOnly: true })
  @Exclude({ toPlainOnly: true })
  email: string;

  @Expose({ toPlainOnly: true })
  get emailaddress3(): string {
    return this.email;
  }

  @IsString()
  @IsNotEmpty()
  @Expose({ toClassOnly: true })
  @Exclude({ toPlainOnly: true })
  address_line1: string;

  @Expose({ toPlainOnly: true })
  get address1_line1(): string {
    return this.address_line1;
  }

  @IsString()
  @IsNotEmpty()
  @Expose({ toClassOnly: true })
  @Exclude({ toPlainOnly: true })
  city: string;

  @Expose({ toPlainOnly: true })
  get address1_city(): string {
    return this.city;
  }

  @IsString()
  @IsNotEmpty()
  @Expose({ toClassOnly: true })
  @Exclude({ toPlainOnly: true })
  departement: string;

  @Expose({ toPlainOnly: true })
  get address1_stateorprovince(): string {
    return this.departement;
  }

  @IsString()
  @IsNotEmpty()
  @Expose({ toClassOnly: true })
  @Exclude({ toPlainOnly: true })
  postal_code: string;

  @Expose({ toPlainOnly: true })
  get address1_postalcode(): string {
    return this.postal_code;
  }

  @IsString()
  @IsNotEmpty()
  @Expose({ toClassOnly: true })
  @Exclude({ toPlainOnly: true })
  country: string;

  @Expose({ toPlainOnly: true })
  get address1_country(): string {
    return this.country;
  }
}
