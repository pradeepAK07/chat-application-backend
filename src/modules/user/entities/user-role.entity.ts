import { Field, ObjectType } from '@nestjs/graphql';
import { userRoleTypeEnum } from 'src/common/common.enum';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'user_roles' })
@ObjectType()
export class UserRole {
  @Field()
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Field(() => User)
  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Field()
  @Column({ name: 'user_id' })
  userId: string;

  @Field()
  @Column({
    name: 'user_type',
    enum: userRoleTypeEnum,
    default: userRoleTypeEnum.USER,
  })
  userType: userRoleTypeEnum;
}
