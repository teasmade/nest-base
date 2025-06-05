import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  OneToOne,
  Relation,
  DeleteDateColumn,
  JoinColumn,
} from 'typeorm';
import { WorkflowVersion } from './workflow-version.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Workflow {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: false })
  isPublished: boolean;

  @OneToOne(
    'WorkflowVersion',
    (workflowVersion: WorkflowVersion) => workflowVersion.workflow,
    { nullable: true },
  )
  @JoinColumn({ name: 'activeVersionId' })
  activeVersion: Relation<WorkflowVersion> | null;

  @OneToMany(
    'WorkflowVersion',
    (workflowVersion: WorkflowVersion) => workflowVersion.workflow,
  )
  versions: Relation<WorkflowVersion>[];

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
