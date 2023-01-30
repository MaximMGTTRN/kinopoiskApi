import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Film } from './Film.entity';

@Entity('genres')
export class Genre extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public genre: string;

  @Column()
  public kinopoiskGenreId: number;

  @ManyToMany(() => Film, (film) => film.id)
  public films: Film[];
}
