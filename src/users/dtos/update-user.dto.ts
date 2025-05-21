import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDTO } from './create-user.dto';

// Example of target structure
// export class UpdateUserDto {
//   name?: string;
//   email?: string;
// }

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
