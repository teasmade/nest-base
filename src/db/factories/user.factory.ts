import { setSeederFactory } from 'typeorm-extension';
import { User } from '../../users/entities/user.entity';

export default setSeederFactory(User, (faker) => {
  const user = new User();
  user.email = faker.internet.email();
  user.password = faker.internet.password({ length: 24 });
  user.isEnabled = true;
  user.isAnon = false;

  return user;
});
