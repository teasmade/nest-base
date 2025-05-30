import { ExcludeODataValues } from 'src/oasis/oasis-common/utils/oasis-utility-types';
import { OasisContactSelectFields } from '../oasis-contacts.constants';

export interface OasisContact {
  '@odata.etag': string;
  contactid: string;
  firstname: string;
  lastname: string;
  fullname: string;
  emailaddress1: string;
  telephone1: string | null;
  cap_civilitecode: number | null;
  'cap_civilitecode@OData.Community.Display.V1.FormattedValue'?: string;
  cap_type_contact_code: number | null;
  'cap_type_contact_code@OData.Community.Display.V1.FormattedValue'?: string;
  address1_line1: string | null;
  address1_line2: string | null;
  address1_line3: string | null;
  address1_postalcode: string | null;
  address1_city: string | null;
  address1_stateorprovince: string | null;
  address1_country: string | null;
  address1_composite: string | null;
  _cap_agence_emploi_referenteid_value: string | null;
  '_cap_agence_emploi_referenteid_value@OData.Community.Display.V1.FormattedValue'?: string;
  address1_longitude: number | null;
  'address1_longitude@OData.Community.Display.V1.FormattedValue'?: string;
  address1_latitude: number | null;
  'address1_latitude@OData.Community.Display.V1.FormattedValue'?: string;
}

type NonODataFormattedOasisContactKeys = keyof ExcludeODataValues<OasisContact>;

// Assert that the keys of the OasisContact interface match the values in the OasisContactSelectFields array, excluding the OData.Community.Display.V1.FormattedValue fields
// This allows us to enforce the interface we use to type the response from OASIS with the values we use to build the select query params when we get contacts.
type _AssertKeysSelectFieldsMatch =
  NonODataFormattedOasisContactKeys extends OasisContactSelectFields
    ? true
    : {
        error: 'OasisContactSelectFields array is missing fields from OasisContact interface';
        missingFields: Exclude<
          NonODataFormattedOasisContactKeys,
          OasisContactSelectFields
        >;
      };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _test: _AssertKeysSelectFieldsMatch = true;
