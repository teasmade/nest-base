import { ExcludeODataFields } from 'src/oasis/oasis-common/utils/oasis-utility-types';
import { OasisAccountSelectFields } from '../oasis-accounts.constants';

export interface OasisAccount {
  '@odata.context'?: string;
  '@odata.etag': string;
  accountid: string;
  accountnumber: string;
  name: string;
  address1_composite: string;
  address1_line1: string;
  address1_line2: string;
  address1_line3: string;
  address1_postalcode: string;
  address1_city: string;
  address1_stateorprovince: string;
  address1_country: string;
  'cap_typedepointdegeolocalisationcode@OData.Community.Display.V1.FormattedValue'?: string;
  cap_typedepointdegeolocalisationcode: number | null;
  'cap_typedepartenairepointgeocode@OData.Community.Display.V1.FormattedValue'?: string;
  cap_typedepartenairepointgeocode: number | null;
  cap_typedepartenairecode: number | null;
  '_cap_partenaireparentid_value@OData.Community.Display.V1.FormattedValue'?: string;
  _cap_partenaireparentid_value: string;
  cap_siret: string | null;
  cap_numtva: string | null;
  createdon: string;
  'createdon@OData.Community.Display.V1.FormattedValue'?: string;
  modifiedon: string;
  'modifiedon@OData.Community.Display.V1.FormattedValue'?: string;
  address1_latitude?: number;
  'address1_latitude@OData.Community.Display.V1.FormattedValue'?: string;
  address1_longitude?: number;
  'address1_longitude@OData.Community.Display.V1.FormattedValue'?: string;
  cap_typevehiculecode: number | null;
  'cap_typevehiculecode@OData.Community.Display.V1.FormattedValue'?: string;
  cap_horairesdouverture: string;
  cap_coutmaximumvoiture: number;
  cap_coutmaximum2roues: number;
  cap_montantcautionvoiture: number;
  cap_montantcaution2roues: number;
  // Cost and caution fields trigger currency fields being included in the response by Dynamics
  // The base currencyid_value field is manually excluded in the ExcludeODataFields utility type
  _transactioncurrencyid_value?: string;
  '_transactioncurrencyid_value@OData.Community.Display.V1.FormattedValue'?: string;
  cap_zonedintervention: string;
  cap_date_debut_indisponibilite: string;
  cap_date_fin_indisponibilite: string;
  cap_typecode: number | null;
  'cap_typecode@OData.Community.Display.V1.FormattedValue'?: string;
}

type NonSelectableOasisAccountKeys = keyof ExcludeODataFields<
  OasisAccount,
  '_transactioncurrencyid_value'
>;

// Assert that the keys of the OasisAccount interface match the values in the OasisAccountSelectFields array
type _AssertKeysSelectFieldsMatch =
  NonSelectableOasisAccountKeys extends OasisAccountSelectFields
    ? true
    : {
        error: 'OasisAccountSelectFields array is missing fields from OasisAccount interface';
        missingFields: Exclude<
          NonSelectableOasisAccountKeys,
          OasisAccountSelectFields
        >;
      };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _test: _AssertKeysSelectFieldsMatch = true;

export interface OasisAccountProximity {
  proximity: number;
  proximityTarget: 'mission' | 'domicile';
}

export type OasisAccountWithProximity = OasisAccount & OasisAccountProximity;
