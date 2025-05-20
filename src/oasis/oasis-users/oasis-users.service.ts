import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { OasisHttpService } from '../oasis-auth/oasis-http.service';

@Injectable()
export class OasisUsersService {
  constructor(private readonly oasisHttpService: OasisHttpService) {}

  public async getOasisUsers() {
    // example endpoint only
    const endpoint =
      '/contacts?$select=contactid,fullname,emailaddress1,telephone1&$top=5&$filter=cap_type_contact_code eq 809020000';

    // if we define types explicitly during development, we can more clearly document the more relevant fields for our business logic.
    // the aim would be to extract these types to interface files once we have a more complete spec.
    type QueryFields = {
      contactid: string;
      fullname: string | null;
      emailaddress1: string | null;
      telephone1: string | null;
    };

    const response = await this.oasisHttpService.get<QueryFields>(endpoint);
    return response.data.value;
  }

  public async validateExternalLogin(
    externalId: string,
    hash: string,
  ): Promise<boolean> {
    const isExternalIdValid = await this.validateExternalId(externalId);
    if (!isExternalIdValid) {
      return false;
    }

    const isExternalHashValid = this.validateExternalHash(externalId, hash);
    return isExternalHashValid;
  }

  private async validateExternalId(externalId: string): Promise<boolean> {
    // TODO - validate externalId
    // This will be completed once we have OASIS integrated.
    /*
    const response = await firstValueFrom(
      this.httpService.get(
        `${process.env.FASTT_OASIS_BASE_URL}/verify-guid/${externalId}`,
      ),
    );
    // TODO - handle response according to OASIS spec
    // Placeholder only
    return response.status === 200 || true;
    */
    console.log('validateExternalId', externalId);
    return await Promise.resolve(true);
  }

  private validateExternalHash(externalId: string, hash: string): boolean {
    // TODO - validate externalHash
    const externalSecret = process.env.FASTT_AUTH_SECRET;
    // hash SHA256(external_id + env secret + date du jour(YYYY-MM-DD))
    // TODO - should this be in a hash service / helper?
    const hashToValidate = crypto
      .createHash('sha256')
      // .update(
      //   `${externalId}${externalSecret}${new Date().toISOString().split('T')[0]}`,
      // )
      // Test update with hardcoded date for use with the sample data in FASTT spec docs
      .update(`${externalId}${externalSecret}${'2024-02-13'}`)
      .digest('hex');
    console.log('externalId', externalId);
    console.log('externalSecret', externalSecret);
    console.log('hashToValidate', hashToValidate);
    console.log('hash', hash);
    return hashToValidate === hash;
  }
}
