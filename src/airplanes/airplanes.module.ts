import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Airplane } from './airpane.entity';
import { AirplaneService } from './airplane.service';
import { AirplanesController } from './airplane.controller';
import { AirplaneType } from './airplaneType.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Airplane, AirplaneType])],
  controllers: [AirplanesController],
  providers: [AirplaneService],
  exports: [AirplaneService],
})
export class AirplnaesModule {}
