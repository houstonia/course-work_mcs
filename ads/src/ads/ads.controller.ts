import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { AdsService } from './ads.service';
import { CreateAdsDto } from './dto/create-ads.dto';
import { UpdateAdsDto } from './dto/update-ads.dto';

@Controller('ads')
export class AdsController {
  constructor(private adsService: AdsService) {}
  @MessagePattern({ cmd: 'create_ads' })
  createAds(adsDto: CreateAdsDto) {
    return this.adsService.createAds(adsDto);
  }

  @MessagePattern({ cmd: 'get_all' })
  getAll() {
    return this.adsService.getAllAds();
  }
  @MessagePattern({ cmd: 'get_ads_by_id' })
  getAdsById(id: number) {
    return this.adsService.getAdsById(id);
  }
  @MessagePattern({ cmd: 'update_ads' })
  updateAds(data: { id: number; updatedAds: UpdateAdsDto }) {
    console.log('ads contr:', data);
    return this.adsService.updateAds(data.id, data.updatedAds);
  }

  @MessagePattern({ cmd: 'delete_ads' })
  deleteAds(id: number) {
    return this.adsService.deleteAds(id);
  }
}
