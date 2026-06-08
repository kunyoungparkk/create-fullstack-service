import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUndefined, omitBy } from 'es-toolkit';
import { EntityNotFoundError, type FindOptionsWhere, ILike, QueryFailedError, Repository } from 'typeorm';

import { getTotalPages } from '@/common/common.utils';

import { AllowedOriginsService } from './allowed-origins.service';
import { Origin } from './entities';

const UNIQUE_VIOLATION = '23505';

@Injectable()
export class OriginsService {
  constructor(
    @InjectRepository(Origin) private readonly originRepository: Repository<Origin>,
    private readonly allowedOriginsService: AllowedOriginsService,
  ) {}

  async create(params: { url: string }): Promise<Origin> {
    const origin = this.originRepository.create(params);

    try {
      await this.originRepository.save(origin);
      await this.allowedOriginsService.invalidate();
    } catch (error) {
      if (error instanceof QueryFailedError && (error.driverError as { code?: string }).code === UNIQUE_VIOLATION) {
        throw new ConflictException('이미 등록된 오리진이 있습니다.');
      }

      throw error;
    }

    return origin;
  }

  async search(params: {
    url?: string;
    isActive?: boolean;
    pageNumber: number;
    pageSize: number;
  }): Promise<{ origins: Origin[]; totalCount: number; pageNumber: number; pageSize: number; totalPages: number }> {
    const { url, isActive, pageNumber, pageSize } = params;
    const where: FindOptionsWhere<Origin> = {};

    if (url) {
      where.url = ILike(`%${url}%`);
    }

    if (isActive !== undefined) {
      where.isActive = isActive;
    }

    const [origins, totalCount] = await this.originRepository.findAndCount({
      where,
      take: pageSize,
      skip: (pageNumber - 1) * pageSize,
      order: { createdAt: 'DESC', url: 'ASC' },
    });

    return { origins, totalCount, pageNumber, pageSize, totalPages: getTotalPages(totalCount, pageSize) };
  }

  async findAll(params: {
    where?: FindOptionsWhere<Origin>;
    pageNumber: number;
    pageSize: number;
  }): Promise<{ origins: Origin[]; totalCount: number; pageNumber: number; pageSize: number; totalPages: number }> {
    const { where = {}, pageNumber, pageSize } = params;
    const [origins, totalCount] = await this.originRepository.findAndCount({
      where,
      take: pageSize,
      skip: (pageNumber - 1) * pageSize,
      order: { createdAt: 'DESC', url: 'ASC' },
    });

    return { origins, totalCount, pageNumber, pageSize, totalPages: getTotalPages(totalCount, pageSize) };
  }

  async findOne(where: FindOptionsWhere<Origin>): Promise<Origin> {
    try {
      return await this.originRepository.findOneByOrFail(where);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('찾을 수 없는 오리진입니다.');
      }

      throw error;
    }
  }

  async update(params: { origin: Origin; url?: string; isActive?: boolean }): Promise<Origin> {
    const { origin, url, isActive } = params;

    this.originRepository.merge(origin, omitBy({ url, isActive }, isUndefined));
    await this.originRepository.save(origin);
    await this.allowedOriginsService.invalidate();

    return origin;
  }

  async remove(origin: Origin): Promise<void> {
    await this.originRepository.remove(origin);
    await this.allowedOriginsService.invalidate();
  }
}
