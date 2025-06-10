export const OASIS_CONTACT_SELECT_FIELDS = [
  'contactid',
  'firstname',
  'lastname',
  'fullname',
  'emailaddress1',
  'telephone1',
  'birthdate',
  'cap_civilitecode',
  'cap_type_contact_code',
  'address1_line1',
  'address1_line2',
  'address1_line3',
  'address1_postalcode',
  'address1_city',
  'address1_stateorprovince',
  'address1_country',
  'address1_composite',
  '_cap_agence_emploi_referenteid_value',
  'address1_longitude',
  'address1_latitude',
] as const;

export type OasisContactSelectFields =
  (typeof OASIS_CONTACT_SELECT_FIELDS)[number];
