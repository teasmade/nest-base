import { Expose, Exclude } from 'class-transformer';
import { OasisAccount } from '@oasis/oasis-resources/oasis-accounts/interfaces';
import { AssertInterfaceKeysMatch } from 'src/oasis/oasis-common/utils/oasis-utility-types';

/**
 * DTO to map relevant Oasis Account data structure to Orizon Partner data structure for frontend usage
 */
export class BaseOasisAccountToPartnerDto implements OasisAccount {
  @Expose()
  '@odata.context': string;

  @Expose()
  '@odata.etag': string;

  @Expose({ name: 'oasis_account_id' })
  accountid: string;

  @Expose({ name: 'fastt_account_number' })
  accountnumber: string;

  @Expose({ name: 'partner_name' })
  name: string;

  @Expose()
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

  @Expose({ name: 'service_point_type' })
  'cap_typedepointdegeolocalisationcode@OData.Community.Display.V1.FormattedValue'?: string;

  @Expose({ name: 'service_point_type_code' })
  cap_typedepointdegeolocalisationcode: number | null;

  @Expose({ name: 'rental_structure_type' })
  'cap_typedepartenairepointgeocode@OData.Community.Display.V1.FormattedValue'?: string;

  @Expose({ name: 'rental_structure_type_code' })
  cap_typedepartenairepointgeocode: number | null;

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

  @Expose({ name: 'latitude' })
  address1_latitude?: number;

  @Expose({ name: 'latitude_formatted' })
  'address1_latitude@OData.Community.Display.V1.FormattedValue'?: string;

  @Expose({ name: 'longitude' })
  address1_longitude?: number;

  @Expose({ name: 'longitude_formatted' })
  'address1_longitude@OData.Community.Display.V1.FormattedValue'?: string;

  @Expose({ name: 'vehicle_type' })
  'cap_typevehiculecode@OData.Community.Display.V1.FormattedValue'?: string;

  @Expose({ name: 'vehicle_type_code' })
  cap_typevehiculecode: number | null;

  @Expose({ name: 'opening_hours' })
  cap_horairesdouverture: string;

  @Expose({ name: 'max_car_price' })
  cap_coutmaximumvoiture: number;

  @Expose({ name: 'max_bike_price' })
  cap_coutmaximum2roues: number;

  @Expose({ name: 'car_deposit' })
  cap_montantcautionvoiture: number;

  @Expose({ name: 'bike_deposit' })
  cap_montantcaution2roues: number;

  @Expose({ name: 'transaction_currency_id' })
  _transactioncurrencyid_value: string;

  @Expose({ name: 'transaction_currency' })
  '_transactioncurrencyid_value@OData.Community.Display.V1.FormattedValue'?: string;

  @Expose({ name: 'zone_of_intervention' })
  cap_zonedintervention: string;

  @Expose({ name: 'unavailable_start_date' })
  cap_date_debut_indisponibilite: string;

  @Expose({ name: 'unavailable_end_date' })
  cap_date_fin_indisponibilite: string;

  @Expose({ name: 'account_type' })
  'cap_typecode@OData.Community.Display.V1.FormattedValue'?: string;

  @Expose({ name: 'account_type_code' })
  cap_typecode: number | null;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _testImplementationKeys: AssertInterfaceKeysMatch<
  BaseOasisAccountToPartnerDto,
  OasisAccount
> = true;
