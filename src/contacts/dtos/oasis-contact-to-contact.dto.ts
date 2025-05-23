import { Expose, Exclude } from 'class-transformer';
import { OasisContact } from 'src/oasis/oasis-contacts/interfaces/oasis-contact.interface';

// TODO - remove partial from partner to account dto?

/**
 * DTO to map relevant Oasis Contact data structure to Orizon Contact data structure for frontend usage
 */
export class OasisContactToContactDto implements OasisContact {
  @Expose()
  contactid: string;

  @Expose({ name: 'first_name' })
  firstname: string;

  @Expose()
  lastname: string;

  @Expose()
  fullname: string;

  @Expose({ name: 'email' })
  emailaddress1: string;

  @Expose()
  telephone1: string | null;

  @Expose()
  cap_civilitecode: number | null;

  @Expose()
  cap_type_contact_code: number | null;

  @Expose()
  address1_line1: string | null;

  @Expose()
  address1_line2: string | null;

  @Expose()
  address1_line3: string | null;

  @Expose()
  address1_postalcode: string | null;

  @Expose()
  address1_city: string | null;

  @Expose()
  address1_stateorprovince: string | null;

  @Expose()
  address1_country: string | null;

  @Expose()
  address1_composite: string | null;

  @Expose()
  _cap_agence_emploi_referenteid_value: string | null;

  @Expose()
  address1_longitude: number | null;

  @Expose()
  address1_latitude: number | null;
}
