import {
  CacheInterceptor,
  Controller,
  Get,
  Query,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { Film } from 'src/entities/Film.entity';
import { FilmService } from './film.service';
import { GetFilmsDto } from './requestDto/getFilmsDto.dto';
import { GetPremiersDto } from './requestDto/getPremiers.dto';

@Controller('film')
export class FilmController {
  constructor(private readonly filmService: FilmService) {}
  @Get('premier')
  public async getPremiers(@Query() params: GetPremiersDto): Promise<string> {
    const { year, month } = params;
    return await this.filmService.getAllPremiersFromApi(year, month);
  }

  @Get('countries-and-genres')
  public async updateCountriesAndGeners(): Promise<void> {
    await this.filmService.getAllCountriesAndGeners();
  }

  @UseInterceptors(CacheInterceptor)
  @Get('getFilms')
  public async getFilms(
    @Query(new ValidationPipe({ transform: true })) getFilmQuery: GetFilmsDto,
  ): Promise<Film[]> {
    return await this.filmService.getFilms(getFilmQuery);
  }
}
