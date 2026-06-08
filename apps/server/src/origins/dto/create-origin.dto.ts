import { Expose, Transform } from 'class-transformer';
import { IsUrl } from 'class-validator';
import { type CreateOrigin, type OriginRes } from 'types';

export class CreateOriginDto implements CreateOrigin {
  @IsUrl()
  url!: string;
}

export class CreateOriginRes implements OriginRes {
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
