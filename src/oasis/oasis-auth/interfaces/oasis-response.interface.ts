export interface OasisResponse<T> {
  '@odata.context': string;
  '@Microsoft.Dynamics.CRM.totalrecordcount': number;
  '@Microsoft.Dynamics.CRM.totalrecordcountlimitexceeded': boolean;
  '@Microsoft.Dynamics.CRM.globalmetadataversion': string;
  value: Array<T & { '@odata.etag': string }>;
}
