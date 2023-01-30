import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilmModule } from './film/film.module';
import { KinopoiskApiModule } from './kinopoiskApi/kinopoiskApi.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DB,
      synchronize: false,
      logging: true,
      migrationsTableName: 'migrations',
      namingStrategy: new SnakeNamingStrategy(),
      entities: [__dirname + '/../**/*.entity{.js,.ts}'],
      migrations: ['dist/**/migrations/*.js'],
    }),
    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT),
      ttl: 3600,
      max: 10,
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    FilmModule,
    KinopoiskApiModule,
    SchedulerModule,
  ],
  controllers: [AppController],
  providers: [AppService, FilmModule],
})
export class AppModule {}
