import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { OasisAuthService } from './oasis-auth.service';
import { oasisConstants } from './oasis.constants';
import { OasisResponse, PaginatedOasisResponse } from './interfaces';
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
  ): Promise<PaginatedOasisResponse<T>> {
    try {
      const token = await this.oasisAuthService.getAccessToken();
      const requestUrl = await this._buildRequestUrl(
        endpoint,
        paginationSessionId,
        direction,
      );
      const response = await this._makeRequest<T>(requestUrl, token, pageSize);

      return this._handleResponse<T>(response, paginationSessionId, direction);
    } catch (error) {
      console.error(
        'Error making GET request to OASIS:',
        JSON.stringify(error, null, 2),
      );
      throw new Error('Failed to make GET request to OASIS');
    }
  }

  async post<T>(endpoint: string, data: any): Promise<string> {
    try {
      const token = await this.oasisAuthService.getAccessToken();
      const requestUrl = `${oasisConstants.oasisBaseUrl}${endpoint}`;

      const response = await firstValueFrom(
        this.httpService.post<OasisResponse<T>>(requestUrl, data, {
          headers: this._buildPostHeaders(token),
        }),
      );
      // If successful we get a 204 with the entity id in the header: odata-entityid
      if (response.status === 204) {
        return response.headers['odata-entityid'] as string;
      }
      return '';
    } catch (error) {
      console.error(
        'Error making POST request to OASIS:',
        JSON.stringify(error, null, 2),
      );
      throw new Error('Failed to make POST request to OASIS');
    }
  }

  async patch<T>(endpoint: string, data: any): Promise<string> {
    try {
      const token = await this.oasisAuthService.getAccessToken();
      const requestUrl = `${oasisConstants.oasisBaseUrl}${endpoint}`;

      const response = await firstValueFrom(
        this.httpService.patch<OasisResponse<T>>(requestUrl, data, {
          headers: this._buildPostHeaders(token),
        }),
      );
      // If successful we get a 204 with the entity id in the header: odata-entityid
      if (response.status === 204) {
        return response.headers['odata-entityid'] as string;
      }
      return '';
    } catch (error) {
      console.error(
        'Error making PATCH request to OASIS:',
        JSON.stringify(error),
      );
      throw new Error('Failed to make PATCH request to OASIS');
    }
  }

  private async _buildRequestUrl(
    endpoint: string,
    paginationSessionId?: string,
    direction?: 'next' | 'prev',
  ): Promise<string> {
    const { oasisBaseUrl } = oasisConstants;
    let requestUrl = `${oasisBaseUrl}${endpoint}`;

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

    return requestUrl;
  }

  private async _makeRequest<T>(
    requestUrl: string,
    token: string,
    pageSize: number,
  ): Promise<OasisResponse<T>> {
    const response = await firstValueFrom(
      this.httpService.get<OasisResponse<T>>(requestUrl, {
        headers: this._buildHeaders(token, pageSize),
      }),
    );
    return response.data;
  }

  private _buildPostHeaders(token: string): Record<string, string> {
    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json; charset=utf-8',
      'Odata-Version': '4.0',
      'Odata-MaxVersion': '4.0',
    };
  }

  private _buildHeaders(
    token: string,
    pageSize: number,
  ): Record<string, string> {
    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Odata-Version': '4.0',
      'Odata-MaxVersion': '4.0',
      Prefer: this._buildPreferHeader(pageSize),
    };
  }

  private _buildPreferHeader(pageSize: number): string {
    const basePrefer =
      'odata.include-annotations=OData.Community.Display.V1.FormattedValue';
    return pageSize
      ? `${basePrefer}, odata.maxpagesize=${pageSize}`
      : basePrefer;
  }

  private async _handleResponse<T>(
    response: OasisResponse<T>,
    paginationSessionId?: string,
    direction?: 'next' | 'prev',
  ): Promise<PaginatedOasisResponse<T>> {
    if (response['@odata.nextLink']) {
      const paginationResult =
        await this.oasisPaginationService.handlePagination(
          paginationSessionId,
          response['@odata.nextLink'],
          response['@odata.count'],
          direction,
        );

      return {
        data: response,
        pagination: paginationResult,
      };
    }

    return { data: response };
  }
}
