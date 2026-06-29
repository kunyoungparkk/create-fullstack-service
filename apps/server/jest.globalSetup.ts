import 'reflect-metadata';

import { DataSource } from 'typeorm';

import { dataSourceOptions } from './data-source';
import { Origin } from './src/origins/entities';
import { ORIGIN_FIXTURES } from './test/test.fixtures';

export default async function setup(): Promise<void> {
  const dataSource = new DataSource({ ...dataSourceOptions, entities: [Origin] });

  await dataSource.initialize();
  await dataSource.synchronize(true);
  await dataSource.getRepository(Origin).save([...ORIGIN_FIXTURES]);
  await dataSource.destroy();
}
