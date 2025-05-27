import { Expose, Exclude } from 'class-transformer';
import { AssertInterfaceKeysMatch } from 'src/oasis/oasis-common/utils/oasis-utility-types';
import { OasisContact } from 'src/oasis/oasis-contacts/interfaces/oasis-contact.interface';

/**
 * DTO to map relevant Oasis Contact data structure to Orizon Contact data structure for frontend usage
 */
export class OasisContactToContactDto implements OasisContact {
  @Exclude()
  '@odata.etag': string;

  @Expose({ name: 'oasis_contact_id' })
  contactid: string;

  @Expose({ name: 'first_name' })
  firstname: string;

  @Expose({ name: 'last_name' })
  lastname: string;

  @Expose({ name: 'full_name' })
  fullname: string;

  @Expose({ name: 'email' })
  emailaddress1: string;

  @Expose({ name: 'phone_number' })
  telephone1: string | null;

  @Expose({ name: 'title' })
  'cap_civilitecode@OData.Community.Display.V1.FormattedValue'?: string;

  @Exclude()
  cap_civilitecode: number | null;

  @Expose({ name: 'contact_type' })
  'cap_type_contact_code@OData.Community.Display.V1.FormattedValue'?: string;

  @Expose({ name: 'contact_type_code' })
  cap_type_contact_code: number | null;

  @Expose({ name: 'address_line1' })
  address1_line1: string | null;

  @Expose({ name: 'address_line2' })
  address1_line2: string | null;

  @Expose({ name: 'address_line3' })
  address1_line3: string | null;

  @Expose({ name: 'postal_code' })
  address1_postalcode: string | null;

  @Expose({ name: 'city' })
  address1_city: string | null;

  @Expose({ name: 'departement' })
  address1_stateorprovince: string | null;

  @Expose({ name: 'country' })
  address1_country: string | null;

  @Exclude()
  address1_composite: string | null;

  @Expose({ name: 'referring_agency' })
  '_cap_agence_emploi_referenteid_value@OData.Community.Display.V1.FormattedValue'?: string;

  @Expose({ name: 'referring_agency_id' })
  _cap_agence_emploi_referenteid_value: string | null;

  @Expose({ name: 'longitude' })
  'address1_longitude@OData.Community.Display.V1.FormattedValue'?: string;

  @Exclude()
  address1_longitude: number | null;

  @Expose({ name: 'latitude' })
  'address1_latitude@OData.Community.Display.V1.FormattedValue'?: string;

  @Exclude()
  address1_latitude: number | null;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _testImplementationKeys: AssertInterfaceKeysMatch<
  OasisContactToContactDto,
  OasisContact
> = true;
