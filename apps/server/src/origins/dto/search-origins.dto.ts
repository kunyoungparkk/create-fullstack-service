import { Expose, Transform, Type } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { type OriginsRes, type SearchOrigins } from 'types';

import { EscapeWildcards, OmitEmpty, Trim } from '@/common/common.decorators';

import { FindOriginRes } from './find-origin.dto';

export class SearchOriginsDto implements SearchOrigins {
  @IsOptional()
  @IsString()
  @EscapeWildcards()
  @OmitEmpty()
  @Trim()
  url?: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  isActive?: boolean;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageNumber!: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  pageSize!: number;
}

export class SearchOriginsRes implements OriginsRes {
  @Expose()
  @Type(() => FindOriginRes)
  origins!: FindOriginRes[];

  @Expose()
  totalCount!: number;

  @Expose()
  pageNumber!: number;

  @Expose()
  pageSize!: number;

  @Expose()
  totalPages!: number;
}
