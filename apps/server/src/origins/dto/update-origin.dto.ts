import { Expose } from 'class-transformer';
import { IsBoolean, IsOptional, IsUrl } from 'class-validator';
import { type OriginRes, type UpdateOrigin } from 'types';

export class UpdateOriginDto implements UpdateOrigin {
  @IsOptional()
  @IsUrl()
  url?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateOriginRes implements Pick<OriginRes, 'id' | 'url' | 'isActive'> {
  @Expose()
  id!: string;

  @Expose()
  url!: string;

  @Expose()
  isActive!: boolean;
}
