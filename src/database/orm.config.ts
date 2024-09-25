import { DataSource } from 'typeorm';
import dbConfig from './db.config';

const datasource = async () => {
  const data = (await dbConfig()).default;
  delete data.cli;
  delete data.autoLoadEntities;
  const dataSource = new DataSource(data);
  return dataSource;
};
export default datasource();
