import { BaseOasisAccountToPartnerDto } from 'src/external-resources/partners/common/dtos/base-oasis-account-to-partner.dto';
import { PickType } from '@nestjs/mapped-types';

export class OasisAccountToServicePointDto extends PickType(
  BaseOasisAccountToPartnerDto,
  [
    'accountid',
    'name',
    'address1_line1',
    'address1_line2',
    'address1_line3',
    'address1_postalcode',
    'address1_city',
    'address1_stateorprovince',
    'address1_country',
    'address1_latitude',
    'address1_longitude',
    'cap_typedepointdegeolocalisationcode@OData.Community.Display.V1.FormattedValue',
    'cap_typedepointdegeolocalisationcode',
    'cap_typedepartenairepointgeocode@OData.Community.Display.V1.FormattedValue',
    'cap_typedepartenairepointgeocode',
    'cap_typecode@OData.Community.Display.V1.FormattedValue',
    'cap_typecode',
    'cap_horairesdouverture',
    'cap_coutmaximumvoiture',
    'cap_coutmaximum2roues',
    'cap_montantcautionvoiture',
    'cap_montantcaution2roues',
    'cap_zonedintervention',
    'cap_date_debut_indisponibilite',
    'cap_date_fin_indisponibilite',
  ] as const,
) {}
