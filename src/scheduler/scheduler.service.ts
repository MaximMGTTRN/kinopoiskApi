import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { FilmService } from 'src/film/film.service';
import * as moment from 'moment';
import { MonthsEnum } from 'src/enums/monthsEnum';
import { Film } from 'src/entities/Film.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import AppDataSource from 'db/typeorm.config';

@Injectable()
export class SchedulerService {
  constructor(
    @InjectRepository(Film) private readonly filmRep: Repository<Film>,
    private readonly filmService: FilmService,
  ) {}

  @Cron('0 10 * */1 *')
  private async getThisMonthPremiers() {
    await AppDataSource.createQueryBuilder()
      .delete()
      .from(Film)
      .where('1 = 1')
      .execute();

    const currentYear = moment().year();
    const currentMonth = moment().format('MMMM');

    await this.filmService.getAllPremiersFromApi(
      currentYear,
      currentMonth as MonthsEnum,
    );
  }

  @Cron('0 0 * */1 *')
  private async getNewGenresAndCountries() {
    await this.filmService.getAllCountriesAndGeners();
  }
}
