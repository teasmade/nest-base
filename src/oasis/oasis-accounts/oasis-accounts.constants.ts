export const OASIS_ACCOUNT_SELECT_FIELDS = [
  'accountid',
  'accountnumber',
  'name',
  'address1_composite',
  'address1_city',
  'address1_stateorprovince',
  'address1_country',
  'address1_line1',
  'address1_line2',
  'address1_line3',
  'address1_postalcode',
  'cap_siret',
  'cap_numtva',
  'cap_typedepartenairecode',
  'cap_typedepointdegeolocalisationcode',
  'cap_typedepartenairepointgeocode',
  '_cap_partenaireparentid_value',
  'createdon',
  'modifiedon',
] as const;

export type OasisAccountSelectFields =
  (typeof OASIS_ACCOUNT_SELECT_FIELDS)[number];
