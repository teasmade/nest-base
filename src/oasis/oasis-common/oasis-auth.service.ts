import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import { OauthResponse } from './interfaces';
import { oasisConstants } from './oasis.constants';

@Injectable()
export class OasisAuthService {
  private readonly TOKEN_CACHE_KEY = 'oasis_access_token';
  private readonly TOKEN_EXPIRY_SECONDS = 60 * 60 - 1 - 180;

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly httpService: HttpService,
  ) {}

  async getAccessToken(): Promise<string> {
    try {
      // Try to get token from cache first
      const cachedToken = await this.cacheManager.get<string>(
        this.TOKEN_CACHE_KEY,
      );
      if (cachedToken) {
        return cachedToken;
      }
      // If no cached token, get a new one
      return this.refreshToken();
    } catch (error) {
      console.error('Error getting access token from cache:', error);
      throw new Error('Failed to get access token');
    }
  }

  private async refreshToken(): Promise<string> {
    const {
      oauthEndpoint,
      oauthClientId,
      oauthClientSecret,
      oauthResource,
      oauthGrantType,
    } = oasisConstants;

    try {
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
      };
      const response: AxiosResponse<OauthResponse> = await firstValueFrom(
        this.httpService.post(
          oauthEndpoint,
          {
            client_id: oauthClientId,
            client_secret: oauthClientSecret,
            grant_type: oauthGrantType,
            resource: oauthResource,
          },
          { headers },
        ),
      );

      const { access_token } = response.data;

      await this.cacheManager.set(
        this.TOKEN_CACHE_KEY,
        access_token,
        this.TOKEN_EXPIRY_SECONDS * 1000,
      );

      return access_token;
    } catch (error) {
      console.error('Error obtaining OASIS access token', error);
      throw new Error('Failed to obtain OASIS access token');
    }
  }
}
