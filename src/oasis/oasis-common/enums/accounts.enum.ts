// partner type code = cap_typedepartenairepointgeocode
export const accountTypeCodeMap = {
  nationaux: 809020000,
  sans_voiture: 809020001,
  asso_4_roues: 809020002,
  asso_mixte: 809020003,
} as const;

export const accountTypeDisplayNameMap = {
  nationaux: 'Partenaires nationaux',
  sans_voiture: 'Partenaires sans voiture',
  asso_4_roues: 'Partenaires 4 roues associatif',
  asso_mixte: 'Partenaires associatifs mixtes',
} as const;

// partner category code = cap_typedepointdegeolocalisationcode
export const accountCategoryCodeMap = {
  // microcredit: 809020007,
  reparation_renault: 809020006,
  permis: 809020005,
  location_vehicule: 809020004,
  reparation_vehicule: 809020003,
  // logement_temporaire: 809020002,
  // logement_locatif: 809020001,
  // garde_enfant: 809020000,
} as const;

export const accountCategoryDisplayNameMap = {
  reparation_renault: 'Réparation de véhicule Renault',
  permis: 'Permis de conduire',
  location_vehicule: 'Location de véhicule',
  reparation_vehicule: 'Réparation de véhicule',
} as const;

export type AccountTypes = keyof typeof accountTypeCodeMap;
export type AccountsCategories = keyof typeof accountCategoryCodeMap;

type AccountSearchableFields = 'name' | 'city' | 'postalcode';
export type AccountSearchQuery = `${AccountSearchableFields}:${string}`;
