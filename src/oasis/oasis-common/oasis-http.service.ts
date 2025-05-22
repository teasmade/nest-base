import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { OasisAuthService } from './oasis-auth.service';
import { oasisConstants } from './oasis.constants';
import { OasisResponse } from './interfaces';
import { OasisPaginationService } from './oasis-pagination.service';

/**
 * Service for making HTTP requests to the OASIS API
 *
 * Handles authentication and request formatting for OASIS endpoints by:
 * - Managing access tokens through OasisAuthService
 * - Setting required headers for OASIS OData API
 * - Formatting URLs with base path
 * - Handling response types and error cases
 *
 * @remarks
 * All requests are authenticated using OAuth bearer tokens that are automatically
 * retrieved and cached by the OasisAuthService.
 */

@Injectable()
export class OasisHttpService {
  constructor(
    private readonly httpService: HttpService,
    private readonly oasisAuthService: OasisAuthService,
    private readonly oasisPaginationService: OasisPaginationService,
  ) {}

  async get<T>(
    endpoint: string,
    pageSize: number = 25,
    paginationSessionId?: string,
    direction?: 'next' | 'prev',
  ): Promise<{
    data: OasisResponse<T>;
    // TODO - extract pagination return type to a separate interface
    pagination?: { paginationSessionId: string; currentPage: number };
  }> {
    try {
      const token = await this.oasisAuthService.getAccessToken();
      const { oasisBaseUrl } = oasisConstants;
      let requestUrl = `${oasisBaseUrl}${endpoint}`;

      // If pagination session id and direction are provided, get the next or previous link from the session
      if (paginationSessionId && direction) {
        const newRequestUrl =
          await this.oasisPaginationService.getLinkFromSession(
            paginationSessionId,
            direction,
          );
        if (newRequestUrl) {
          requestUrl = newRequestUrl;
        }
      }

      // Make the request
      const response = await firstValueFrom(
        this.httpService.get<OasisResponse<T>>(requestUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Odata-Version': '4.0',
            'Odata-MaxVersion': '4.0',
            Prefer: `odata.include-annotations=OData.Community.Display.V1.FormattedValue${pageSize ? `, odata.maxpagesize=${pageSize}` : ''}`,
          },
        }),
      );

      // If a nextlink has been received, update the pagination session
      // console.log('response.data', response.data);
      if (response.data['@odata.nextLink']) {
        // console.log('nextlink', response.data['@odata.nextlink']);
        const paginationResult =
          await this.oasisPaginationService.handlePagination(
            paginationSessionId,
            response.data['@odata.nextLink'],
            direction,
          );

        console.log('paginationResult', paginationResult);
        return {
          data: response.data,
          pagination: paginationResult,
        };
      }

      return { data: response.data };
    } catch (error) {
      console.error('Error making GET request to OASIS:', error);
      throw new Error('Failed to make GET request to OASIS');
    }
  }

  // async post<T>(endpoint: string, data: any) {
  //   const token = await this.oasisAuthService.getAccessToken();
  //   return firstValueFrom(
  //     this.httpService.post<T>(
  //       `${process.env.FASTT_OASIS_BASE_URL}${endpoint}`,
  //       data,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           'Content-Type': 'application/json',
  //           Accept: 'application/json',
  //         },
  //       },
  //     ),
  //   );
  // }
}
