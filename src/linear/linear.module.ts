import { Module } from '@nestjs/common';
import { LinearService } from './linear.service';
import { ConfigModule } from '@nestjs/config';
import { LinearController } from './linear.controller';

@Module({
  imports: [ConfigModule],
  providers: [LinearService],
  controllers: [LinearController],
})
export class LinearModule {}
