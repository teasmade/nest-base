import { setSeederFactory } from 'typeorm-extension';
import { UserProfile } from '../../users/entities/user-profile.entity';
import { UserRole } from '../../users/enums/user-role.enum';

export default setSeederFactory(UserProfile, (faker) => {
  const profile = new UserProfile();
  profile.firstName = faker.person.firstName();
  profile.lastName = faker.person.lastName();
  profile.role = faker.helpers.arrayElement(Object.values(UserRole));
  profile.phoneNumber = faker.phone.number();
  profile.company = faker.company.name();
  profile.position = faker.person.jobTitle();

  return profile;
});
