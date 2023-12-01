import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthzModule } from './authz/authz.module';
import {LinearModule} from "./linear/linear.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    AuthzModule,
    LinearModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
