export enum RentalStructureTypeCodes {
  Nationaux = 809020000,
  SansVoiture = 809020001,
  Asso4Roues = 809020002,
  AssoMixte = 809020003,
}

const rentalStructureTypeOptionSet = [
  {
    code: RentalStructureTypeCodes.Nationaux,
    name: 'Partenaires nationaux',
  },
  {
    code: RentalStructureTypeCodes.SansVoiture,
    name: 'Partenaires sans voiture',
  },
  {
    code: RentalStructureTypeCodes.Asso4Roues,
    name: 'Partenaires 4 roues associatif',
  },
  {
    code: RentalStructureTypeCodes.AssoMixte,
    name: 'Partenaires associatifs mixtes',
  },
];

const rentalStructureTypeConfig = {
  targetOasisProperty: 'cap_typedepartenairepointgeocode',
  paramName: 'filterRentalStructureType',
  optionSet: rentalStructureTypeOptionSet,
};

export enum ServicePointTypeCodes {
  ReparationRenault = 809020006,
  Permis = 809020005,
  LocationVehicule = 809020004,
  ReparationVehicule = 809020003,
}

// We need to export as an array of values to use as defaults in domain resource service methods
export const validServicePointTypeCodes = [
  ServicePointTypeCodes.ReparationRenault,
  ServicePointTypeCodes.Permis,
  ServicePointTypeCodes.LocationVehicule,
  ServicePointTypeCodes.ReparationVehicule,
];

const servicePointTypeOptionSet = [
  {
    code: ServicePointTypeCodes.ReparationRenault,
    name: 'Réparation de véhicule Renault',
  },
  {
    code: ServicePointTypeCodes.Permis,
    name: 'Permis de conduire',
  },
  {
    code: ServicePointTypeCodes.LocationVehicule,
    name: 'Location de véhicule',
  },
  {
    code: ServicePointTypeCodes.ReparationVehicule,
    name: 'Réparation de véhicule',
  },
];

const servicePointTypeConfig = {
  targetOasisProperty: 'cap_typedepointdegeolocalisationcode',
  paramName: 'filterServicePointType',
  optionSet: servicePointTypeOptionSet,
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
    rentalStructureTypes: rentalStructureTypeConfig,
    servicePointTypes: servicePointTypeConfig,
    vehicleTypes: vehicleTypeConfig,
  },
};
