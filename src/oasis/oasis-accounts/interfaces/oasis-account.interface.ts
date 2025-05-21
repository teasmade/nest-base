// This is an example of the account object returned by the Oasis API
// with our specific set of selects, filters and OData parameters applied
/*
const object = {
  '@odata.etag': 'W/"1574123289"',
  'modifiedon@OData.Community.Display.V1.FormattedValue': '13/12/2024 16:41',
  modifiedon: '2024-12-13T16:41:25Z',
  address1_stateorprovince: 'Eure-et-Loire',
  address1_country: 'France',
  address1_line1: '6 rue Francis Vovelle',
  address1_composite:
    '6 rue Francis Vovelle\r\n28000 CHARTRES Eure-et-Loire\r\nFrance',
  name: '3R LOCATION - CHARTRES',
  'createdon@OData.Community.Display.V1.FormattedValue': '17/04/2023 09:03',
  createdon: '2023-04-17T09:03:29Z',
  address1_postalcode: '28000',
  cap_siret: null,
  cap_numtva: null,
  'cap_typedepointdegeolocalisationcode@OData.Community.Display.V1.FormattedValue':
    'Location de véhicule',
  cap_typedepointdegeolocalisationcode: 809020004,
  cap_typedepartenairecode: null,
  accountnumber: '00143871',
  address1_city: 'CHARTRES',
  accountid: '88d4a3b3-fedc-ed11-a7c6-000d3a2e4b78',
  'cap_typedepartenairepointgeocode@OData.Community.Display.V1.FormattedValue':
    'Partenaires sans voiture',
  cap_typedepartenairepointgeocode: 809020001,
  '_cap_partenaireparentid_value@OData.Community.Display.V1.FormattedValue':
    '3R',
  _cap_partenaireparentid_value: 'd6adc401-d19b-ed11-aad1-000d3a2e4969',
};
*/

export interface OasisAccount {
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
