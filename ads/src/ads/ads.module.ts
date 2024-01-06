import { Module } from '@nestjs/common';

import { AdsService } from './ads.service';
import { AdsController } from './ads.controller';
import { Ads } from './ads.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  providers: [AdsService],
  imports: [SequelizeModule.forFeature([Ads])],
  controllers: [AdsController],
})
export class AdsModule {}
