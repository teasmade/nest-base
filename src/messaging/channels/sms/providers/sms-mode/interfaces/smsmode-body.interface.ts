export interface SmsModeBody {
  recipient: {
    to: string;
  };
  body: {
    text: string;
  };
  from?: string;
  refClient?: string;
  callbackUrlStatus?: string;
  callbackUrlMo?: string;
}
