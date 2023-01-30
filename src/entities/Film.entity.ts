import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Country } from './Country.entity';
import { Genre } from './Genre.entity';

@Entity('films')
export class Film extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public kinopoiskId: number;

  @Column()
  public nameRu: string;

  @Column()
  public posterUrl: string;

  @Column()
  public dateRelise: Date;

  @ManyToMany(() => Country, (country) => country.id)
  @JoinTable({ name: 'films_countries' })
  public countries: Country[];

  @ManyToMany(() => Genre, (genre) => genre.id)
  @JoinTable({ name: 'films_genres' })
  public genres: Genre[];
}
