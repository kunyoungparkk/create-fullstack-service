import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AllowedOriginsService } from './allowed-origins.service';
import { Origin } from './entities';
import { OriginsController } from './origins.controller';
import { OriginsService } from './origins.service';

@Module({
  imports: [TypeOrmModule.forFeature([Origin])],
  controllers: [OriginsController],
  providers: [AllowedOriginsService, OriginsService],
  exports: [AllowedOriginsService],
})
export class OriginsModule {}
