export interface OasisContact {
  contactid: string;
  firstname: string;
  lastname: string;
  fullname: string;
  emailaddress1: string;
  telephone1: string | null;
  cap_civilitecode: number | null;
  'cap_civilitecode@OData.Community.Display.V1.FormattedValue'?: string | null;
  cap_type_contact_code: number | null;
  'cap_type_contact_code@OData.Community.Display.V1.FormattedValue'?:
    | string
    | null;
  address1_line1: string | null;
  address1_line2: string | null;
  address1_line3: string | null;
  address1_postalcode: string | null;
  address1_city: string | null;
  address1_stateorprovince: string | null;
  address1_country: string | null;
  address1_composite: string | null;
  _cap_agence_emploi_referenteid_value: string | null;
  '_cap_agence_emploi_referenteid_value@OData.Community.Display.V1.FormattedValue'?:
    | string
    | null;
  address1_longitude: number | null;
  'address1_longitude@OData.Community.Display.V1.FormattedValue'?:
    | string
    | null;
  address1_latitude: number | null;
  'address1_latitude@OData.Community.Display.V1.FormattedValue'?: string | null;
}
