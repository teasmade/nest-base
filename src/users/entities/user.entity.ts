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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => UserProfile, (profile) => profile.user)
  profile: Relation<UserProfile>;

  @ManyToMany(() => UserGroup, (userGroup) => userGroup.users)
  userGroups: Relation<UserGroup[]>;
}
