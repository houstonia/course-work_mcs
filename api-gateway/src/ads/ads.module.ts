import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

import { AdsController } from './ads.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    {
      provide: 'ADS_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('ADS_SERVICE_HOST'),
            port: configService.get('ADS_SERVICE_PORT'),
          },
        }),
    },
  ],
  controllers: [AdsController],
})
export class AdsModule {}
