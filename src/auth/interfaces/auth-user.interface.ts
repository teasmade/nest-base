import { UserRole } from 'src/users/enums/user-role.enum';

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
}
