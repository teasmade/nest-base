import { Expose, Exclude } from 'class-transformer';
import { OasisAccount } from 'src/oasis/oasis-accounts/interfaces';
import { AssertInterfaceKeysMatch } from 'src/oasis/oasis-common/utils/oasis-utility-types';

/**
 * DTO to map relevant Oasis Account data structure to Orizon Partner data structure for frontend usage
 */
export class OasisAccountToPartnerDto implements OasisAccount {
  @Exclude()
  '@odata.etag': string;

  @Expose({ name: 'oasis_account_id' })
  accountid: string;

  @Expose({ name: 'fastt_account_number' })
  accountnumber: string;

  @Expose({ name: 'partner_name' })
  name: string;

  @Exclude()
  address1_composite: string;

  @Expose({ name: 'address_line1' })
  address1_line1: string;

  @Expose({ name: 'address_line2' })
  address1_line2: string;

  @Expose({ name: 'address_line3' })
  address1_line3: string;

  @Expose({ name: 'postal_code' })
  address1_postalcode: string;

  @Expose({ name: 'city' })
  address1_city: string;

  @Expose({ name: 'departement' })
  address1_stateorprovince: string;

  @Expose({ name: 'country' })
  address1_country: string;

  @Expose({ name: 'partner_category' })
  'cap_typedepointdegeolocalisationcode@OData.Community.Display.V1.FormattedValue'?: string;

  @Expose({ name: 'partner_category_code' })
  cap_typedepointdegeolocalisationcode: number | null;

  @Expose({ name: 'partner_type' })
  'cap_typedepartenairepointgeocode@OData.Community.Display.V1.FormattedValue'?: string;

  @Expose({ name: 'partner_type_code' })
  cap_typedepartenairepointgeocode: number | null;

  @Exclude()
  cap_typedepartenairecode: number | null;

  @Expose({ name: 'parent_name' })
  '_cap_partenaireparentid_value@OData.Community.Display.V1.FormattedValue'?: string;

  @Expose({ name: 'parent_oasis_id' })
  _cap_partenaireparentid_value: string;

  @Expose({ name: 'siret' })
  cap_siret: string | null;

  @Expose({ name: 'tva' })
  cap_numtva: string | null;

  @Expose({ name: 'created_at' })
  createdon: string;

  @Expose({ name: 'created_at_formatted' })
  'createdon@OData.Community.Display.V1.FormattedValue'?: string;

  @Expose({ name: 'updated_at' })
  modifiedon: string;

  @Expose({ name: 'updated_at_formatted' })
  'modifiedon@OData.Community.Display.V1.FormattedValue'?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _testImplementationKeys: AssertInterfaceKeysMatch<
  OasisAccountToPartnerDto,
  OasisAccount
> = true;
