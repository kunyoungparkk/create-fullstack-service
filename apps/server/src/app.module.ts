import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TerminusModule } from '@nestjs/terminus';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';

import { dataSourceOptions } from '@/../data-source';
import { OriginsModule } from '@/origins/origins.module';
import { RedisModule } from '@/redis/redis.module';

import { cacheConfig, configConfig, loggerConfig, throttlerConfig } from './app.configs';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(configConfig),
    LoggerModule.forRoot(loggerConfig),
    TypeOrmModule.forRoot({ ...dataSourceOptions, autoLoadEntities: true }),
    CacheModule.registerAsync(cacheConfig),
    RedisModule,
    TerminusModule,
    ThrottlerModule.forRootAsync(throttlerConfig),
    OriginsModule,
  ],
  controllers: [AppController],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }, AppService],
})
export class AppModule {}
