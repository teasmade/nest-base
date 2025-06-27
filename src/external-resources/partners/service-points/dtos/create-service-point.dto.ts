import { IsOptional } from 'class-validator';

import { BaseCreatePartnerDto } from '../../common/dtos';
import { PickType } from '@nestjs/mapped-types';

export class CreateServicePointDto extends PickType(BaseCreatePartnerDto, [
  'name',
  'partner_name',
  'email',
  'emailaddress3',
  'address_line1',
  'address1_line1',
  'address_line2',
  'address1_line2',
  'address_line3',
  'address1_line3',
  'city',
  'address1_city',
  'departement',
  'address1_stateorprovince',
  'postal_code',
  'address1_postalcode',
  'country',
  'address1_country',
  'parent_oasis_id',
  'cap_Partenaireparentid@odata.bind',
  'service_point_type_code',
  'cap_typedepointdegeolocalisationcode',
  'rental_structure_type_code',
  'cap_typedepartenairepointgeocode',
  'opening_hours',
  'cap_horairesdouverture',
  'max_car_price',
  'cap_coutmaximumvoiture',
  'max_bike_price',
  'cap_coutmaximum2roues',
  'car_deposit',
  'cap_montantcautionvoiture',
  'bike_deposit',
  'cap_montantcaution2roues',
  'zone_of_intervention',
  'cap_zonedintervention',
  'unavailable_start_date',
  'cap_date_debut_indisponibilite',
  'unavailable_end_date',
  'cap_date_fin_indisponibilite',
]) {
  @IsOptional()
  address_line2: BaseCreatePartnerDto['address_line2'];

  @IsOptional()
  address_line3: BaseCreatePartnerDto['address_line3'];

  @IsOptional()
  opening_hours: BaseCreatePartnerDto['opening_hours'];

  @IsOptional()
  max_car_price: BaseCreatePartnerDto['max_car_price'];

  @IsOptional()
  max_bike_price: BaseCreatePartnerDto['max_bike_price'];

  @IsOptional()
  car_deposit: BaseCreatePartnerDto['car_deposit'];

  @IsOptional()
  bike_deposit: BaseCreatePartnerDto['bike_deposit'];

  @IsOptional()
  zone_of_intervention: BaseCreatePartnerDto['zone_of_intervention'];

  @IsOptional()
  unavailable_start_date: BaseCreatePartnerDto['unavailable_start_date'];

  @IsOptional()
  unavailable_end_date: BaseCreatePartnerDto['unavailable_end_date'];
}
