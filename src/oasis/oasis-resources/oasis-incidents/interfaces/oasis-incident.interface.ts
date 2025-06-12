import { ExcludeODataValues } from 'src/oasis/oasis-common/utils/oasis-utility-types';
import { OasisIncidentSelectFields } from '../oasis-incidents.constants';

export interface OasisIncident {
  '@odata.etag': string;
  title: string;
  '_cap_serviceid_value@OData.Community.Display.V1.FormattedValue': string;
  _cap_serviceid_value: string;
  incidentid: string;
  '_cap_domaineid_value@OData.Community.Display.V1.FormattedValue': string;
  _cap_domaineid_value: string;
  description: string | null;
  caseorigincode: number;
  'caseorigincode@OData.Community.Display.V1.FormattedValue': string;
  '_customerid_value@OData.Community.Display.V1.FormattedValue': string;
  _customerid_value: string;
}

type NonODataFormattedOasisIncidentKeys =
  keyof ExcludeODataValues<OasisIncident>;

type _AssertKeysSelectFieldsMatch =
  NonODataFormattedOasisIncidentKeys extends OasisIncidentSelectFields
    ? true
    : {
        error: 'OasisIncidentSelectFields array is missing fields from OasisIncident interface';
        missingFields: Exclude<
          NonODataFormattedOasisIncidentKeys,
          OasisIncidentSelectFields
        >;
      };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _test: _AssertKeysSelectFieldsMatch = true;
