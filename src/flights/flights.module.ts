import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flight } from './flights.entity';
import { FLightsController } from './flight.controller';
import { FlightsService } from './flights.service';
@Module({
  imports: [TypeOrmModule.forFeature([Flight])],
  controllers: [FLightsController],
  providers: [FlightsService],
  exports: [FlightsService],
})
export class FlightsModule {}
