import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 'fakeuuid1',
      name: 'Tshimanga Mukendi',
      email: 'tshim@myapp.com',
    },
    {
      id: 'fakeuuid2',
      name: 'Kasereka Akim',
      email: 'kase@myapp.com',
    },
  ];

  findAll(): User[] {
    return this.users;
  }

  createUser(user: CreateUserDto): User {
    const newUser = {
      ...user,
      id: 'fakeuuid' + this.users.length + 1,
    };
    this.users.push(newUser);
    return newUser;
  }

  // intersection type
  // Note dto for update user does not have id
  // Dto is for strictly data
  // The id is a resource identifier (routing layer)
  updateUser(user: UpdateUserDto & { id: string }): User {
    const userIndex = this.users.findIndex((u) => u.id === user.id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    // This would be a quick shallow merge
    // But unsafe if input includes fields that are not in the user object
    // this.users[userIndex] = { ...this.users[userIndex], ...user };

    this.users[userIndex] = {
      name: user.name ?? this.users[userIndex].name,
      email: user.email ?? this.users[userIndex].email,
      id: this.users[userIndex].id,
    };

    return this.users[userIndex];
  }
}
