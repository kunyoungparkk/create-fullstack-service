import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Origin } from './entities';

const ALLOWED_ORIGINS_CACHE_KEY = 'allowed-origins';

@Injectable()
export class AllowedOriginsService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Origin) private readonly originRepository: Repository<Origin>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async get(): Promise<string[]> {
    let allowedOrigins = await this.cacheManager.get<string[]>(ALLOWED_ORIGINS_CACHE_KEY);

    if (allowedOrigins) {
      return allowedOrigins;
    }

    allowedOrigins = Array.from(
      new Set([
        ...(this.configService.get<string[]>('ALLOWED_ORIGINS') || []),
        ...(await this.originRepository.findBy({ isActive: true })).map((origin) => origin.url),
      ]),
    );
    await this.cacheManager.set(ALLOWED_ORIGINS_CACHE_KEY, allowedOrigins);

    return allowedOrigins;
  }

  async invalidate(): Promise<void> {
    await this.cacheManager.del(ALLOWED_ORIGINS_CACHE_KEY);
  }
}
