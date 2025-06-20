import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  Relation,
  DeleteDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { MessageSend } from './message-send.entity';
import { Exclude } from 'class-transformer';

export enum MessageChannel {
  SMS = 'sms',
  EMAIL = 'email',
}

export enum TemplateStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity()
export class MessageTemplate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  category: string;

  @Column({ type: 'jsonb', nullable: true })
  tags: string[];

  @Column({
    type: 'enum',
    enum: MessageChannel,
  })
  channel: MessageChannel;

  @Column({
    type: 'enum',
    enum: TemplateStatus,
    default: TemplateStatus.ACTIVE,
  })
  status: TemplateStatus;

  @Column({ default: 1 })
  version: number;

  // CONTENT FIELDS
  // SMS content (plain text)
  @Column({ type: 'text', nullable: true })
  smsContent: string;

  // Email content (HTML)
  @Column({ type: 'text', nullable: true })
  emailHtmlContent: string;

  // Email plain text fallback
  @Column({ type: 'text', nullable: true })
  emailTextContent: string;

  // Email subject
  @Column({ type: 'text', nullable: true })
  emailSubject: string;

  // Possibility of just targetting templates defined provider-side
  @Column({ nullable: true })
  providerTemplateId: string;

  // Possible template variables (e.g., ["name", "orderNumber", "amount"])
  @Column('jsonb', { default: [] })
  variables: string[];

  // Relationships
  @OneToMany(() => MessageSend, (messageSend) => messageSend.template)
  messageSends: Relation<MessageSend[]>;

  @ManyToOne(() => User)
  createdBy: Relation<User>;

  @ManyToOne(() => User)
  updatedBy: Relation<User>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  @Exclude()
  deletedAt: Date;
}
