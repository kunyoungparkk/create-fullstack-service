// @ts-expect-error no type declarations
import '@swc-node/register/esm-register';
import 'reflect-metadata';

import { ORIGIN_FIXTURES } from '@test/test.fixtures';
import { DataSource } from 'typeorm';

import { dataSourceOptions } from '@/../data-source';
import { Origin } from '@/origins/entities';

export async function setup(): Promise<void> {
  const dataSource = new DataSource({ ...dataSourceOptions, entities: [Origin] });

  await dataSource.initialize();
  await dataSource.synchronize(true);
  await dataSource.getRepository(Origin).save([...ORIGIN_FIXTURES]);
  await dataSource.destroy();
}
