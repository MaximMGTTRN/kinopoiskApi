import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from 'src/entities/Country.entity';
import { Film } from 'src/entities/Film.entity';
import { Genre } from 'src/entities/Genre.entity';
import { FilmModule } from 'src/film/film.module';
import { SchedulerService } from './scheduler.service';

@Module({
  imports: [
    forwardRef(() => FilmModule),
    TypeOrmModule.forFeature([Genre, Country, Film]),
  ],
  providers: [SchedulerService],
})
export class SchedulerModule {}
