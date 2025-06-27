export interface OasisUpdateAccountBody {
  name?: string;
  cap_typecode?: number;
  cap_typedepartenairepointgeocode?: number;
  cap_typedepointdegeolocalisationcode?: number;
  cap_typevehiculecode?: number;
  'cap_Partenaireparentid@odata.bind'?: string;
  emailaddress3?: string;
  address1_line1?: string;
  address1_line2?: string;
  address1_line3?: string;
  address1_city?: string;
  address1_stateorprovince?: string;
  address1_postalcode?: string;
  address1_country?: string;
  cap_siret?: string;
  cap_numtva?: string;
  cap_horairesdouverture?: string;
  cap_coutmaximumvoiture?: number;
  cap_coutmaximum2roues?: number;
  cap_montantcautionvoiture?: number;
  cap_montantcaution2roues?: number;
  cap_zonedintervention?: string;
  cap_date_debut_indisponibilite?: string;
  cap_date_fin_indisponibilite?: string;
}
