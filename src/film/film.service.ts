import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from 'src/entities/Country.entity';
import { Film } from 'src/entities/Film.entity';
import { Genre } from 'src/entities/Genre.entity';
import { Repository } from 'typeorm';
import { GetFilmsDto } from './requestDto/getFilmsDto.dto';
import { KinopoiskApiService } from 'src/kinopoiskApi/kinopoiskApi.service';
import { MonthsEnum } from 'src/enums/monthsEnum';
import PAGINATION from 'src/consts/pagination.const';

@Injectable()
export class FilmService {
  constructor(
    @InjectRepository(Genre) private readonly generRep: Repository<Genre>,
    @InjectRepository(Country) private readonly countryRep: Repository<Country>,
    @InjectRepository(Film) private readonly filmRep: Repository<Film>,
    private readonly kinopoiskApiService: KinopoiskApiService,
  ) {}

  public async getAllPremiersFromApi(
    year: number,
    month: MonthsEnum,
  ): Promise<string> {
    const { data } = await this.kinopoiskApiService.getRequest('premieres', {
      year,
      month,
    });
    try {
      if (!data.total) {
        return `За указанный месяц ${year} года премьер не найдено`;
      }
      const filmsList = data.items;
      Promise.all(
        filmsList.map(async (film) => {
          const currentFilm = await this.filmRep.findOne({
            where: {
              kinopoiskId: film.kinopoiskId,
            },
          });
          if (!currentFilm) {
            const newFilm = new Film();
            newFilm.kinopoiskId = film.kinopoiskId;
            newFilm.dateRelise = film.premiereRu;
            newFilm.countries = await this.findFilmCountries(film.countries);
            newFilm.genres = await this.findFilmGenres(film.genres);
            newFilm.nameRu = film.nameRu;
            newFilm.posterUrl = film.posterUrl;
            return newFilm;
          }
        }),
      ).then((values) => {
        this.filmRep.save(values);
      });

      return `Кинопремьеры за указанный месяц ${year} года получены `;
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Ошибка сохранения премьер в базу данных',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private findFilmCountries(countries): Promise<Country[]> {
    return Promise.all(
      countries.map(async (item) => {
        return await this.countryRep.find({
          where: {
            countryName: item.country,
          },
        });
      }),
    )
      .then((res) => {
        return res.flat();
      })
      .catch((e) => {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Ошибка поиска стран',
          },
          HttpStatus.BAD_REQUEST,
        );
      });
  }

  private findFilmGenres(genres): Promise<Genre[]> {
    return Promise.all(
      genres.map(async (item) => {
        return await this.generRep.find({
          where: {
            genre: item.genre,
          },
        });
      }),
    )
      .then((res) => {
        return res.flat();
      })
      .catch((e) => {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'Ошибка поиска жанра',
          },
          HttpStatus.BAD_REQUEST,
        );
      });
  }

  public async getAllCountriesAndGeners(): Promise<void> {
    const { data } = await this.kinopoiskApiService.getRequest('filters');
    if (data) {
      const { genres, countries } = data;
      Promise.all(
        genres.map(async (apiGenre) => {
          const existGenre = await this.generRep.findOne({
            where: {
              genre: apiGenre.genre,
            },
          });
          if (!existGenre) {
            const newGenre = new Genre();
            newGenre.genre = apiGenre.genre;
            newGenre.kinopoiskGenreId = apiGenre.id;
            return newGenre;
          }
        }),
      )
        .then((val) => {
          this.generRep.save(val);
        })
        .catch((e) => {
          throw new HttpException(
            {
              status: HttpStatus.BAD_REQUEST,
              error: 'Ошибка сохранения жанров в базу данных',
            },
            HttpStatus.BAD_REQUEST,
          );
        });
      Promise.all(
        countries.map(async (apiCountry) => {
          const existCountry = await this.countryRep.findOne({
            where: {
              countryName: apiCountry.country,
            },
          });
          if (!existCountry) {
            const newCountry = new Country();
            newCountry.countryName = apiCountry.country;
            newCountry.kinopoiskCountryId = apiCountry.id;
            return newCountry;
          }
        }),
      )
        .then((val) => {
          this.countryRep.save(val);
        })
        .catch((e) => {
          throw new HttpException(
            {
              status: HttpStatus.BAD_REQUEST,
              error: 'Ошибка сохранения стран в базу данных',
            },
            HttpStatus.BAD_REQUEST,
          );
        });
    }
  }

  public getFilms({
    country,
    offset,
    genres,
    nameFilm,
    orderType,
    orderOrientation,
  }: GetFilmsDto): Promise<Film[]> {
    const currentFilmsQuery = this.filmRep
      .createQueryBuilder('film')
      .select(['film.id', 'film.nameRu', 'film.dateRelise', 'film.posterUrl'])
      .leftJoinAndSelect('film.countries', 'countries')
      .leftJoinAndSelect('film.genres', 'genres')
      .orderBy(`film.${orderType}`, `${orderOrientation}`)
      .limit(PAGINATION.LIMIT);
    if (offset) {
      currentFilmsQuery.offset(10 * Number(offset));
    }
    if (country) {
      currentFilmsQuery.andWhere(`countries.countryName = :country`, {
        country,
      });
    }
    if (genres?.length) {
      currentFilmsQuery.andWhere(`genres.genre IN (:...genres)`, { genres });
    }
    if (nameFilm) {
      currentFilmsQuery.andWhere('film.nameRu LIKE :nameFilm', {
        nameFilm: `%${nameFilm}%`,
      });
    }
    return currentFilmsQuery.getMany();
  }
}
