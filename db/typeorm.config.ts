import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import connection from './db.connection';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const AppDataSource = new DataSource({
  ...connection,
  entities: [__dirname + '/../**/*.entity{.js,.ts}'],
  migrations: ['dist/**/migrations/*.js'],
  namingStrategy: new SnakeNamingStrategy(),
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

export default AppDataSource;
