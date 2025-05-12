import { UserRole } from 'src/users/enums/user-role.enum';

export interface UserContext {
  user: {
    id: string;
    email: string;
    role: UserRole;
  };
}
