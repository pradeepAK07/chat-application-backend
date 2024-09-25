import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'movies_list' })
export class Movie {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  @Field()
  id: string;

  @Field()
  @Column({ name: 'movie_name' })
  movieName: string;

  @Field()
  @Column({ name: 'director' })
  director: string;

  @Field({ nullable: true })
  @Column({ name: 'music_director', nullable: true })
  musicDirector?: string;

  @Field()
  @Column({ name: 'released_year' })
  releasedYear: string;
}
