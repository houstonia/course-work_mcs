import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AdsModule } from './ads/ads.module';

@Module({
  imports: [UserModule, AuthModule, AdsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
