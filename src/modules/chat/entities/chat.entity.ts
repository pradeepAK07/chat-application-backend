import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'chat' })
@ObjectType()
export class Chat {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  @Field()
  id: string;

  @Column({ name: 'sender_id' })
  @Field({ description: "sender's user id" })
  senderId: string;

  @Column({ name: 'recipient_id' })
  @Field({ description: "recipient's user id" })
  recipientId: string;

  @Column({ name: 'room_id' })
  @Field({ description: 'this is for user to user room id' })
  roomId: string;

  @Column({ name: 'sender_name' })
  @Field()
  senderName: string;

  @Column({ name: 'message' })
  @Field()
  message: string;

  @Field({ nullable: true })
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP(6)',
    name: 'created_at',
  })
  createdAt: Date;
}
