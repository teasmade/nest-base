export const OASIS_INCIDENT_SELECT_FIELDS = [
  'incidentid',
  'description',
  'title',
  '_cap_serviceid_value',
  '_cap_domaineid_value',
  'caseorigincode',
  '_customerid_value',
  'cap_adresse_latitude',
  'cap_adresse_longitude',
] as const;

export type OasisIncidentSelectFields =
  (typeof OASIS_INCIDENT_SELECT_FIELDS)[number];
