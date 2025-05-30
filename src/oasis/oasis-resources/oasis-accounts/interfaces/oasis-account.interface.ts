import { ExcludeODataValues } from 'src/oasis/oasis-common/utils/oasis-utility-types';
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
}

type NonODataFormattedOasisAccountKeys = keyof ExcludeODataValues<OasisAccount>;

// Assert that the keys of the OasisAccount interface match the values in the OasisAccountSelectFields array
type _AssertKeysSelectFieldsMatch =
  NonODataFormattedOasisAccountKeys extends OasisAccountSelectFields
    ? true
    : {
        error: 'OasisAccountSelectFields array is missing fields from OasisAccount interface';
        missingFields: Exclude<
          NonODataFormattedOasisAccountKeys,
          OasisAccountSelectFields
        >;
      };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _test: _AssertKeysSelectFieldsMatch = true;
