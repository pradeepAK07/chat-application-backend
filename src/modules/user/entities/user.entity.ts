import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from './user-role.entity';

@Entity({ name: 'users' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  @Field()
  id: string;

  @Field()
  @Column({ name: 'first_name' })
  firstName: string;

  @Field({ nullable: true })
  @Column({ nullable: true, name: 'last_name' })
  lastName: string;

  @Field()
  @Column({ name: 'user_name' })
  userName: string;

  @Exclude()
  @Column({ name: 'password' })
  password: string;

  @Field(() => [UserRole], { nullable: true })
  @OneToMany(() => UserRole, (role) => role.user, {
    cascade: true,
    eager: true,
  })
  userRoles: UserRole[];
}
