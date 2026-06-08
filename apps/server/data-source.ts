import { config } from 'dotenv';
import { snakeCase } from 'es-toolkit';
import pluralize from 'pluralize';
import { DataSource, type DataSourceOptions, DefaultNamingStrategy } from 'typeorm';

export function getEnvFilePath(): string {
  return `.env.${process.env.NODE_ENV}`;
}

export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development';
}

class PluralNamingStrategy extends DefaultNamingStrategy {
  tableName(targetName: string, userSpecifiedName?: string): string {
    return userSpecifiedName ?? pluralize(snakeCase(targetName));
  }

  columnName(propertyName: string, customName?: string, embeddedPrefixes: string[] = []): string {
    return snakeCase([...embeddedPrefixes, customName ?? propertyName].join('_'));
  }
}

config({ path: getEnvFilePath(), quiet: true });

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  migrations: ['dist/migrations/*.js'],
  namingStrategy: new PluralNamingStrategy(),
  synchronize: !isProduction(),
  logging: !isProduction(),
};

export default new DataSource({ ...dataSourceOptions, entities: ['dist/**/*.entity.js'] });
