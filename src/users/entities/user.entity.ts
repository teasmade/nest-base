import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToMany,
  Relation,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { UserProfile } from './user-profile.entity';
import { UserGroup } from './user-group.entity';
import { HashPolicy } from '../enums';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 100 })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: true })
  isEnabled: boolean;

  @Column({ default: false })
  isAnon: boolean;

  @Column({
    type: 'enum',
    enum: HashPolicy,
    default: HashPolicy.BCRYPT,
  })
  hashPolicy: HashPolicy;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // TODO - add hashPolicy field
  // string - don't return in response
  // to import existing users with different tech

  @OneToOne(() => UserProfile, (profile) => profile.user)
  profile: Relation<UserProfile>;

  @ManyToMany(() => UserGroup, (userGroup) => userGroup.users)
  userGroups: Relation<UserGroup[]>;
}
