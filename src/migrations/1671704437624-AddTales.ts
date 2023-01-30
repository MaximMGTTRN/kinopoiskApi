import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTales1671704437624 implements MigrationInterface {
  name = 'AddTales1671704437624';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "genres" ("id" SERIAL NOT NULL, "genre" character varying NOT NULL, "kinopoisk_genre_id" integer NOT NULL, CONSTRAINT "PK_80ecd718f0f00dde5d77a9be842" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "films" ("id" SERIAL NOT NULL, "kinopoisk_id" integer NOT NULL, "name_ru" character varying NOT NULL, "poster_url" character varying NOT NULL, "date_relise" TIMESTAMP NOT NULL, CONSTRAINT "PK_697487ada088902377482c970d1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "countries" ("id" SERIAL NOT NULL, "country_name" character varying NOT NULL, "kinopoisk_country_id" integer NOT NULL, CONSTRAINT "PK_b2d7006793e8697ab3ae2deff18" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "films_countries" ("films_id" integer NOT NULL, "countries_id" integer NOT NULL, CONSTRAINT "PK_6011c3cffdbc87eedd2ab8b834c" PRIMARY KEY ("films_id", "countries_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_975f7604dcac1f2c2b47e835e2" ON "films_countries" ("films_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_77542d0108c0adbe13f6facf22" ON "films_countries" ("countries_id") `,
    );
    await queryRunner.query(
      `CREATE TABLE "films_genres" ("films_id" integer NOT NULL, "genres_id" integer NOT NULL, CONSTRAINT "PK_b8121a332c7e50769bbc747fea9" PRIMARY KEY ("films_id", "genres_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d6fd00fc2d9327922bd9ca5bf6" ON "films_genres" ("films_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_996ea8785d26b065e029840bfa" ON "films_genres" ("genres_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "films_countries" ADD CONSTRAINT "FK_975f7604dcac1f2c2b47e835e29" FOREIGN KEY ("films_id") REFERENCES "films"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "films_countries" ADD CONSTRAINT "FK_77542d0108c0adbe13f6facf223" FOREIGN KEY ("countries_id") REFERENCES "countries"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "films_genres" ADD CONSTRAINT "FK_d6fd00fc2d9327922bd9ca5bf6b" FOREIGN KEY ("films_id") REFERENCES "films"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "films_genres" ADD CONSTRAINT "FK_996ea8785d26b065e029840bfa7" FOREIGN KEY ("genres_id") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "films_genres" DROP CONSTRAINT "FK_996ea8785d26b065e029840bfa7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "films_genres" DROP CONSTRAINT "FK_d6fd00fc2d9327922bd9ca5bf6b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "films_countries" DROP CONSTRAINT "FK_77542d0108c0adbe13f6facf223"`,
    );
    await queryRunner.query(
      `ALTER TABLE "films_countries" DROP CONSTRAINT "FK_975f7604dcac1f2c2b47e835e29"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_996ea8785d26b065e029840bfa"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d6fd00fc2d9327922bd9ca5bf6"`,
    );
    await queryRunner.query(`DROP TABLE "films_genres"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_77542d0108c0adbe13f6facf22"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_975f7604dcac1f2c2b47e835e2"`,
    );
    await queryRunner.query(`DROP TABLE "films_countries"`);
    await queryRunner.query(`DROP TABLE "countries"`);
    await queryRunner.query(`DROP TABLE "films"`);
    await queryRunner.query(`DROP TABLE "genres"`);
  }
}
