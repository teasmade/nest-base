import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Relation,
  DeleteDateColumn,
} from 'typeorm';
import { Workflow } from './workflow.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class WorkflowVersion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  version: string;

  @Column({ nullable: true })
  description: string;

  @Column('jsonb', { default: {} })
  definition: Record<string, unknown>;

  @Column({ default: false })
  isPublished: boolean;

  @ManyToOne(() => Workflow, (workflow) => workflow.versions)
  workflow: Relation<Workflow>;

  @ManyToOne(() => User)
  createdBy: Relation<User>;

  @ManyToOne(() => User)
  updatedBy: Relation<User>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
