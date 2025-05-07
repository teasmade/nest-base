import { DataSource } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { UserProfile } from '../../users/entities/user-profile.entity';
import { UserRole } from '../../users/enums/user-role.enum';
import { Seeder } from 'typeorm-extension';

export default class UserSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const userRepository = dataSource.getRepository(User);
    const profileRepository = dataSource.getRepository(UserProfile);

    // Create admin user
    const adminUser = userRepository.create({
      email: 'admin@example.com',
      password: 'admin123',
      isEnabled: true,
      isAnon: false,
    });

    await userRepository.save(adminUser);

    const adminProfile = profileRepository.create({
      firstName: 'Admin',
      lastName: 'User',
      role: UserRole.ADMIN,
      user: adminUser,
    });

    await profileRepository.save(adminProfile);
  }
}
