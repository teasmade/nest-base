export enum ContactTypeCodes {
  InterimWorker = 809020000,
  AgencyContact = 809020001,
  PartnerContact = 809020002,
}

const contactTypeOptionSet = [
  {
    code: ContactTypeCodes.InterimWorker,
    name: 'Intérimaire',
  },
  {
    code: ContactTypeCodes.AgencyContact,
    name: 'Contact Agence',
  },
  {
    code: ContactTypeCodes.PartnerContact,
    name: 'Contact Partenaire',
  },
];

const contactTypeConfig = {
  targetOasisProperty: 'cap_type_contact_code',
  paramName: 'filterType',
  optionSet: contactTypeOptionSet,
};

export const contactsConfig = {
  contacts: {
    types: contactTypeConfig,
  },
};
