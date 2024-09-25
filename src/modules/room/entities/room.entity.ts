import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'room' })
@ObjectType()
export class Room {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  @Field()
  id: string;

  @Column('text', { name: 'user_ids', array: true })
  @Field(() => [String])
  userIds: string[];

  @Column({ name: 'is_group', default: false })
  @Field()
  isGroup: boolean;

  @Column({ name: 'group_name', nullable: true })
  @Field()
  groupName: string;

  @Column({ name: 'is_private', default: false })
  @Field()
  isPrivate: boolean;
}
