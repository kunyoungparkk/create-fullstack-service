import { Expose, Transform } from 'class-transformer';
import { type OriginRes } from 'types';

export class FindOriginRes implements OriginRes {
  @Expose()
  id!: string;

  @Expose()
  url!: string;

  @Expose()
  isActive!: boolean;

  @Expose()
  @Transform(({ value }) => (value as Date).toISOString())
  createdAt!: string;
}
