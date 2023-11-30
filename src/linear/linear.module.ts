import { Module } from '@nestjs/common';
import { LinearService } from './linear.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [LinearService],
})
export class LinearModule {}
