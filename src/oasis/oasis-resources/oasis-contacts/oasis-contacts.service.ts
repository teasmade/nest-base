import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { OasisHttpService } from '@oasis/oasis-common/oasis-http.service';
import { OasisContact } from './interfaces/oasis-contact.interface';
import { PaginatedOasisResponse } from '@oasis/oasis-common/interfaces/oasis-pagination.interface';
import { OASIS_CONTACT_SELECT_FIELDS } from './oasis-contacts.constants';
import { GetContactsQueryParamsDTO } from 'src/external-resources/contacts/dtos/get-contacts-query-params.dto';
import { OasisResourceService } from '@oasis/oasis-common/base-services/oasis-resource.service';

@Injectable()
export class OasisContactsService extends OasisResourceService {
  constructor(private readonly oasisHttpService: OasisHttpService) {
    super();
  }

  public async getOasisContacts(
    getContactsQueryParams?: GetContactsQueryParamsDTO,
  ): Promise<PaginatedOasisResponse<OasisContact>> {
    const { pageSize, paginationSessionId, direction, paramsString } =
      this.handleQueryParams(
        getContactsQueryParams ?? {},
        OASIS_CONTACT_SELECT_FIELDS,
      );

    const endpoint = '/contacts';

    const response = await this.oasisHttpService.get<OasisContact>(
      `${endpoint}${paramsString}`,
      pageSize,
      paginationSessionId,
      direction,
    );
    return response;
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
