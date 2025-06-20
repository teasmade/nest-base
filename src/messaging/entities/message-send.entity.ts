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
import { User } from '../../users/entities/user.entity';
import { MessageTemplate } from './message-template.entity';
import { Exclude } from 'class-transformer';
import { IsEmail, IsPhoneNumber } from 'class-validator';

export enum MessageStatus {
  PENDING = 'pending',
  SENT = 'sent',
  DELIVERED = 'delivered',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

@Entity()
export class MessageSend {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: MessageStatus,
    default: MessageStatus.PENDING,
  })
  status: MessageStatus;

  @IsEmail()
  @Column({ nullable: true })
  recipientEmail: string;

  @IsPhoneNumber('FR')
  @Column({ nullable: true })
  recipientPhone: string;

  @Column({ nullable: true })
  recipientName: string;

  @Column({ nullable: true })
  recipientOasisId: string;

  // Template and content
  @ManyToOne(() => MessageTemplate)
  template: Relation<MessageTemplate>;

  @Column('jsonb')
  templateData: Record<string, any>;

  @Column({ type: 'text' })
  renderedContent: string; // Final rendered message

  // Provider information
  @Column({ nullable: true })
  providerMessageId: string; // External provider's message ID

  @Column({ nullable: true })
  providerResponse: string; // Raw response from provider

  // Error tracking
  @Column({ nullable: true })
  errorMessage: string;

  @Column({ type: 'int', default: 0 })
  retryCount: number;

  // Scheduling
  @Column({ nullable: true })
  scheduledAt: Date;

  @Column({ nullable: true })
  sentAt: Date;

  @Column({ nullable: true })
  deliveredAt: Date;

  // Trigger metadata - can use during development for tracking context in anticipation of a more complete definition
  // e.g. triggered directly by a user, workflow run, internal event, cronjob etc.
  @Column({ type: 'jsonb', nullable: true })
  triggerMetadata: Record<string, any>;

  // Relationships
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
