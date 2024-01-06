import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Ads } from './ads.model';
import { CreateAdsDto } from './dto/create-ads.dto';
import { UpdateAdsDto } from './dto/update-ads.dto';

@Injectable()
export class AdsService {
  constructor(@InjectModel(Ads) private adsRepository: typeof Ads) {}

  async createAds(dto: CreateAdsDto) {
    const ads = await this.adsRepository.create(dto);
    return ads;
  }

  async getAllAds() {
    const ads = await this.adsRepository.findAll({ include: { all: true } });
    return ads;
  }

  async getAdsById(id: number) {
    const ads = await this.adsRepository.findOne({ where: { id } });
    return ads;
  }

  async updateAds(id: number, updatedAds: UpdateAdsDto) {
    const result = await this.adsRepository.update(updatedAds, {
      where: { id },
    });
    return result;
  }

  async deleteAds(id: number) {
    return await this.adsRepository.destroy({ where: { id } });
  }
}
