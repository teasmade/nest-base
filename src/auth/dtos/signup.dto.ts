import { IsString } from 'class-validator';

export class SignupDTO {
  @IsString()
  readonly email: string;

  @IsString()
  readonly password: string;
}
