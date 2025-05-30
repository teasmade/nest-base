// Oasis either returns an array of objects under value, or a single object containing the context metadata and the object properties.

interface OasisMetadata {
  '@odata.context': string;
  '@Microsoft.Dynamics.CRM.totalrecordcount'?: number;
  '@odata.count'?: number;
  '@Microsoft.Dynamics.CRM.totalrecordcountlimitexceeded'?: boolean;
  '@Microsoft.Dynamics.CRM.globalmetadataversion'?: string;
  '@odata.nextLink'?: string;
}

// For collection responses (array under value)
interface OasisCollectionResponse<T> extends OasisMetadata {
  value: Array<T>;
}

// For single resource responses (metadata mixed with resource)
type OasisSingleResponse<T> = OasisMetadata & T;

// Union type for both response patterns
export type OasisResponse<T> =
  | OasisCollectionResponse<T>
  | OasisSingleResponse<T>;
