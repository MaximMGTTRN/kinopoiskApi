import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { KinopoiskApiService } from './kinopoiskApi.service';

@Module({
  imports: [HttpModule],
  providers: [KinopoiskApiService],
  exports: [KinopoiskApiService],
})
export class KinopoiskApiModule {}
