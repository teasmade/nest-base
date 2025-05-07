import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  Relation,
} from 'typeorm';
import { User } from './user.entity';
import { UserRole } from '../enums/user-role.enum';

@Entity()
export class UserProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.TEMP,
  })
  role: UserRole;

  @Column({ nullable: true })
  phoneNumber?: string;

  @Column({ nullable: true })
  company?: string;

  @Column({ nullable: true })
  position?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn()
  user: Relation<User>;
}
