import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Film } from './Film.entity';

@Entity('countries')
export class Country extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public countryName: string;

  @Column()
  public kinopoiskCountryId: number;

  @ManyToMany(() => Film, (film) => film.id)
  public films: Film[];
}
