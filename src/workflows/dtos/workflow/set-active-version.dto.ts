import { IsString } from 'class-validator';
import { IsNotEmpty } from 'class-validator';

export class SetActiveVersionDto {
  @IsString()
  @IsNotEmpty()
  versionId: string;
}
