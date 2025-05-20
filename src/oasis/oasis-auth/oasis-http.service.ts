import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { OasisAuthService } from './oasis-auth.service';
import { oasisConstants } from './oasis.constants';
import { OasisResponse } from './interfaces';
import { AxiosResponse } from 'axios';

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
  ) {}

  async get<T>(endpoint: string): Promise<AxiosResponse<OasisResponse<T>>> {
    try {
      const token = await this.oasisAuthService.getAccessToken();
      const { oasisBaseUrl } = oasisConstants;
      const response = await firstValueFrom(
        this.httpService.get<OasisResponse<T>>(`${oasisBaseUrl}${endpoint}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Odata-Version': '4.0',
            'Odata-MaxVersion': '4.0',
            Prefer: 'odata.include-annotations=*',
          },
        }),
      );
      return response;
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
