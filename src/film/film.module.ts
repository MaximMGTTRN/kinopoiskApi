import { Module } from '@nestjs/common';
import { FilmService } from './film.service';
import { FilmController } from './film.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from 'src/entities/Genre.entity';
import { Country } from 'src/entities/Country.entity';
import { Film } from 'src/entities/Film.entity';
import { KinopoiskApiModule } from 'src/kinopoiskApi/kinopoiskApi.module';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Genre, Country, Film]),
    KinopoiskApiModule,
  ],
  exports: [FilmService],
  controllers: [FilmController],
  providers: [FilmService],
})
export class FilmModule {}
