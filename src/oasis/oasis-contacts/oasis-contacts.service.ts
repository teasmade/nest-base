import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { OasisHttpService } from '../oasis-common/oasis-http.service';
import { OasisContact } from './interfaces/oasis-contact.interface';
import { PaginatedOasisResponse } from '../oasis-common/interfaces/oasis-pagination.interface';
import { OASIS_CONTACT_SELECT_FIELDS } from './oasis-contacts.constants';

// TODO - break interface out to a separate file
interface OasisContactQueryParams {
  $select?: readonly string[];
  $count?: boolean;
  $filter?: string;
  $orderby?: string;
}

@Injectable()
export class OasisContactsService {
  constructor(private readonly oasisHttpService: OasisHttpService) {}

  public async getOasisContacts(
    pageSize?: number,
    paginationSessionId?: string,
    direction?: 'next' | 'prev',
  ): Promise<PaginatedOasisResponse<OasisContact>> {
    const endpoint = '/contacts';

    const params: OasisContactQueryParams = {
      $select: OASIS_CONTACT_SELECT_FIELDS,
      $count: true,
      $orderby: 'fullname asc',
      $filter: 'cap_type_contact_code eq 809020000',
    };

    const paramsString = this._buildParams(params);
    const response = await this.oasisHttpService.get<OasisContact>(
      `${endpoint}${paramsString}`,
      pageSize,
      paginationSessionId,
      direction,
    );
    return { data: response.data, pagination: response.pagination };
  }

  // TODO - a utility function for building params once we know what sets of params we'll be using in various different services / routes
  private _buildParams(params: OasisContactQueryParams): string {
    const paramStrings: string[] = [];

    if (params.$select) {
      paramStrings.push(`$select=${params.$select.join(',')}`);
    }

    if (params.$count !== undefined) {
      paramStrings.push(`$count=${params.$count}`);
    }

    if (params.$filter) {
      paramStrings.push(`$filter=${params.$filter}`);
    }

    if (params.$orderby) {
      paramStrings.push(`$orderby=${params.$orderby}`);
    }

    return paramStrings.length ? '?' + paramStrings.join('&') : '';
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
