export enum ContactTypeCodes {
  InterimWorker = 809020000,
  AgencyContact = 809020001,
  PartnerContact = 809020002,
}

const contactTypeConfig = {
  InterimWorker: {
    code: 809020000,
    name: 'Intérimaire',
  },
  AgencyContact: {
    code: 809020001,
    name: 'Contact Agence',
  },
  PartnerContact: {
    code: 809020002,
    name: 'Contact Partenaire',
  },
};

export const contactsConfig = {
  contacts: {
    ContactTypes: contactTypeConfig,
  },
};
