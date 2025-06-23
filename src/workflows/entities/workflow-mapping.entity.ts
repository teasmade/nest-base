import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Relation,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { Workflow } from './workflow.entity';

@Entity()
export class WorkflowMapping {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  label: string;

  @Column()
  description: string;

  @ManyToOne(() => Workflow, { nullable: true })
  workflow: Relation<Workflow> | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
