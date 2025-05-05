import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// Example of target structure
// export class UpdateUserDto {
//   name?: string;
//   email?: string;
// }

export class UpdateUserDto extends PartialType(CreateUserDto) {}
