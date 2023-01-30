import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { CONNECTION_TYPES } from 'src/consts/connectionTypes.const';
import { MethodsEnum } from 'src/enums/methodsEnum';

@Injectable()
export class KinopoiskApiService {
  private apiKey = this.configService.get('X_API_KEY_KINOPOISK');
  private kinopoiskLink = this.configService.get('KINOPOISK_LINK');

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  public async getRequest(requestUrl: string, params?) {
    try {
      return await lastValueFrom(
        this.httpService.request({
          method: MethodsEnum.Get,
          url: this.kinopoiskLink + requestUrl,
          params: {
            ...params,
          },
          headers: {
            'X-API-KEY': this.apiKey,
            'Content-Type': CONNECTION_TYPES.APP_JSON,
          },
        }),
      );
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Неудачный запрос на сервис Кинопоиска',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
