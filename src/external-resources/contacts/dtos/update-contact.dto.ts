import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import {
  ExposeForRename,
  Rename,
} from 'src/external-resources/common/decorators';
import { ContactTypeCodes } from 'src/oasis/oasis-common/enums/contacts.enum';

export class UpdateContactDto {
  @IsString()
  @IsOptional()
  @ExposeForRename()
  first_name: string;
  @Rename('first_name')
  firstname: string;

  @IsString()
  @IsOptional()
  @ExposeForRename()
  last_name: string;
  @Rename('last_name')
  lastname: string;

  @IsEmail()
  @IsOptional()
  @ExposeForRename()
  email: string;
  @Rename('email')
  emailaddress1: string;

  @IsString()
  @IsOptional()
  @ExposeForRename()
  phone_number: string;
  @Rename('phone_number')
  telephone1: string;

  @IsOptional()
  @IsEnum(ContactTypeCodes)
  @ExposeForRename()
  contact_type_code: ContactTypeCodes;
  @Rename('contact_type_code')
  cap_type_contact_code: ContactTypeCodes;

  @IsString()
  @IsOptional()
  @ExposeForRename()
  address_line1: string;
  @Rename('address_line1')
  address1_line1: string;

  @IsString()
  @IsOptional()
  @ExposeForRename()
  address_line2: string;
  @Rename('address_line2')
  address1_line2: string;

  @IsString()
  @IsOptional()
  @ExposeForRename()
  address_line3: string;
  @Rename('address_line3')
  address1_line3: string;

  @IsString()
  @IsOptional()
  @ExposeForRename()
  postal_code: string;
  @Rename('postal_code')
  address1_postalcode: string;

  @IsString()
  @IsOptional()
  @ExposeForRename()
  city: string;
  @Rename('city')
  address1_city: string;

  @IsString()
  @IsOptional()
  @ExposeForRename()
  departement: string;
  @Rename('departement')
  address1_stateorprovince: string;

  @IsString()
  @IsOptional()
  @ExposeForRename()
  country: string;
  @Rename('country')
  address1_country: string;

  @IsString()
  @IsOptional()
  @ExposeForRename()
  dob: string;
  @Rename('dob')
  birthdate: string;
}
