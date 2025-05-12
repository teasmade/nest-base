export interface AuthenticatedUser {
  readonly id: string;
  readonly email: string;
  readonly accessToken: string;
}
