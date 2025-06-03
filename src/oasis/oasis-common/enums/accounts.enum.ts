export enum AccountTypeCodes {
  Nationaux = 809020000,
  SansVoiture = 809020001,
  Asso4Roues = 809020002,
  AssoMixte = 809020003,
}

const accountTypeConfig = {
  Nationaux: {
    code: 809020000,
    name: 'Partenaires nationaux',
  },
  SansVoiture: {
    code: 809020001,
    name: 'Partenaires sans voiture',
  },
  Asso4Roues: {
    code: 809020002,
    name: 'Partenaires 4 roues associatif',
  },
  AssoMixte: {
    code: 809020003,
    name: 'Partenaires associatifs mixtes',
  },
};

export enum AccountCategoryCodes {
  ReparationRenault = 809020006,
  Permis = 809020005,
  LocationVehicule = 809020004,
  ReparationVehicule = 809020003,
}

const accountCategoryConfig = {
  ReparationRenault: {
    code: 809020006,
    name: 'Réparation de véhicule Renault',
  },
  Permis: {
    code: 809020005,
    name: 'Permis de conduire',
  },
  LocationVehicule: {
    code: 809020004,
    name: 'Location de véhicule',
  },
  ReparationVehicule: {
    code: 809020003,
    name: 'Réparation de véhicule',
  },
};

// Exporting config object with account types and categories under partners key for use in client
export const partnersConfig = {
  partners: {
    PartnerTypes: accountTypeConfig,
    PartnerCategories: accountCategoryConfig,
  },
};
