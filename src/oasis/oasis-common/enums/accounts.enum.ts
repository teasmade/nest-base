export enum AccountTypeCodes {
  Nationaux = 809020000,
  SansVoiture = 809020001,
  Asso4Roues = 809020002,
  AssoMixte = 809020003,
}

export const validAccountTypeCodes = [
  AccountTypeCodes.Nationaux,
  AccountTypeCodes.SansVoiture,
  AccountTypeCodes.Asso4Roues,
  AccountTypeCodes.AssoMixte,
];

const accountTypeOptionSet = [
  {
    code: AccountTypeCodes.Nationaux,
    name: 'Partenaires nationaux',
  },
  {
    code: AccountTypeCodes.SansVoiture,
    name: 'Partenaires sans voiture',
  },
  {
    code: AccountTypeCodes.Asso4Roues,
    name: 'Partenaires 4 roues associatif',
  },
  {
    code: AccountTypeCodes.AssoMixte,
    name: 'Partenaires associatifs mixtes',
  },
];

const accountTypeConfig = {
  targetOasisProperty: 'cap_typedepartenairepointgeocode',
  paramName: 'filterType',
  optionSet: accountTypeOptionSet,
};

export enum AccountCategoryCodes {
  ReparationRenault = 809020006,
  Permis = 809020005,
  LocationVehicule = 809020004,
  ReparationVehicule = 809020003,
}

const accountCategoryOptionSet = [
  {
    code: AccountCategoryCodes.ReparationRenault,
    name: 'Réparation de véhicule Renault',
  },
  {
    code: AccountCategoryCodes.Permis,
    name: 'Permis de conduire',
  },
  {
    code: AccountCategoryCodes.LocationVehicule,
    name: 'Location de véhicule',
  },
  {
    code: AccountCategoryCodes.ReparationVehicule,
    name: 'Réparation de véhicule',
  },
];

const accountCategoryConfig = {
  targetOasisProperty: 'cap_typedepointdegeolocalisationcode',
  paramName: 'filterCategory',
  optionSet: accountCategoryOptionSet,
};

export enum VehicleTypeCodes {
  DRM_TAXI = 809020011,
  DRM_VELO = 809020010,
  DRM_VELO_TAXI = 809020009,
  DRM = 809020001,
  TAXI = 809020013,
  VELO = 809020002,
  VELO_TAXI = 809020012,
  VOITURE = 809020000,
  VOITURE_DRM = 809020003,
  VOITURE_DRM_TAXI = 809020006,
  VOITURE_DRM_VELO = 809020004,
  VOITURE_DRM_VELO_TAXI = 809020005,
  VOITURE_TAXI = 809020008,
}

const vehicleTypeOptionSet = [
  {
    code: VehicleTypeCodes.DRM_TAXI,
    name: '2 roues motorisées et taxi collectif',
  },
  {
    code: VehicleTypeCodes.DRM_VELO,
    name: '2 roues motorisées et vélo',
  },
  {
    code: VehicleTypeCodes.DRM_VELO_TAXI,
    name: '2 roues motorisées et vélo et taxi collectif',
  },

  {
    code: VehicleTypeCodes.DRM,
    name: '2 roues motorisés',
  },
  {
    code: VehicleTypeCodes.TAXI,
    name: 'Taxi collectif',
  },
  {
    code: VehicleTypeCodes.VELO,
    name: 'Vélo',
  },
  {
    code: VehicleTypeCodes.VELO_TAXI,
    name: 'Vélo et taxi collectif',
  },
  {
    code: VehicleTypeCodes.VOITURE,
    name: 'Voiture',
  },
  {
    code: VehicleTypeCodes.VOITURE_DRM,
    name: 'Voiture et 2 roues motorisées',
  },
  {
    code: VehicleTypeCodes.VOITURE_DRM_TAXI,
    name: 'Voiture et 2 roues motorisées et taxi collectif',
  },
  {
    code: VehicleTypeCodes.VOITURE_DRM_VELO,
    name: 'Voiture et 2 roues motorisées et vélo',
  },
  {
    code: VehicleTypeCodes.VOITURE_DRM_VELO_TAXI,
    name: 'Voiture et 2 roues motorisées et vélo et taxi collectif',
  },
  {
    code: VehicleTypeCodes.VOITURE_TAXI,
    name: 'Voiture et taxi collectif',
  },
];

const vehicleTypeConfig = {
  targetOasisProperty: 'cap_typevehiculecode',
  paramName: 'filterVehicleType',
  optionSet: vehicleTypeOptionSet,
};

// Exporting config object with account types and categories under partners key for use in client
export const partnersConfig = {
  partners: {
    types: accountTypeConfig,
    categories: accountCategoryConfig,
    vehicleTypes: vehicleTypeConfig,
  },
};
