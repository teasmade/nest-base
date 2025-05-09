import { User } from '../../users/entities/user.entity';
import { UserProfile } from '../../users/entities/user-profile.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class UserSeeder implements Seeder {
  // Track ensure that the seed is only run once
  track = true;

  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    console.info('Seed starting...');

    const userFactory = factoryManager.get(User);
    const profileFactory = factoryManager.get(UserProfile);
    const profileRepository = dataSource.getRepository(UserProfile);

    console.info('Seeding Users...');
    const users = await userFactory.saveMany(5);

    console.info('Seeding User Profiles...');
    for (const user of users) {
      const userProfile = await profileFactory.make();
      userProfile.user = user;
      await profileRepository.save(userProfile);
    }

    console.info('Seed completed');
  }
}
