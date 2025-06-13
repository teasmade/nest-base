import { Expose, Exclude } from 'class-transformer';
import { OasisIncident } from '@oasis/oasis-resources/oasis-incidents/interfaces/oasis-incident.interface';

export class OasisIncidentToDemandeDto implements OasisIncident {
  @Exclude()
  '@odata.etag': string;

  @Expose({ name: 'oasis_incident_id' })
  incidentid: string;

  @Expose({ name: 'demande_id' })
  demandeid: string;

  @Expose({ name: 'description' })
  description: string;

  @Expose({ name: 'title' })
  title: string;

  @Expose({ name: 'service_id' })
  _cap_serviceid_value: string;

  @Expose({ name: 'service_name' })
  '_cap_serviceid_value@OData.Community.Display.V1.FormattedValue': string;

  @Expose({ name: 'domaine_id' })
  _cap_domaineid_value: string;

  @Expose({ name: 'domaine_name' })
  '_cap_domaineid_value@OData.Community.Display.V1.FormattedValue': string;

  @Expose({ name: 'case_origin_code' })
  caseorigincode: number;

  @Expose({ name: 'case_origin_name' })
  'caseorigincode@OData.Community.Display.V1.FormattedValue': string;

  @Expose({ name: 'customer_id' })
  _customerid_value: string;

  @Expose({ name: 'customer_name' })
  '_customerid_value@OData.Community.Display.V1.FormattedValue': string;

  @Exclude()
  cap_adresse_latitude: number;

  @Exclude()
  cap_adresse_longitude: number;
}
