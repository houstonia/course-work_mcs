import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { Patch } from '@nestjs/common/decorators';
import { ClientProxy } from '@nestjs/microservices';

import { CreateAdsDto } from './dto/create-ads.dto';
import { UpdateAdsDto } from './dto/update-ads.dto';

@Controller('ads')
export class AdsController {
  constructor(@Inject('ADS_SERVICE') private client: ClientProxy) {}

  @Post()
  createAds(@Body() adsDto: CreateAdsDto) {
    return this.client.send({ cmd: 'create_ads' }, adsDto);
  }

  @Get()
  getAll() {
    return this.client.send({ cmd: 'get_all' }, '');
  }
  @Get(':id')
  getAdsById(@Param('id') id: number) {
    return this.client.send({ cmd: 'get_ads_by_id' }, id);
  }

  @Patch(':id')
  updateAds(@Param('id') id: number, @Body() updatedAds: UpdateAdsDto) {
    console.log(id, updatedAds);
    const data = { id, updatedAds };
    return this.client.send({ cmd: ' update_ads' }, data);
  }

  @Delete(':id')
  deleteAds(@Param('id') id: number) {
    return this.client.send({ cmd: 'delete_ads' }, id);
  }
}
