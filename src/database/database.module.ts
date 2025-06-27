import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/users.entity'; // dodaj inne encje, jeśli masz
import { Flight } from '../flights/flights.entity';
import { Airplane } from '../airplanes/airpane.entity';
import { AirplaneType } from '../airplanes/airplaneType.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      database: 'logbook_app',
      username: 'root',
      password: '',
      host: 'localhost',
      entities: [User, Flight, Airplane, AirplaneType],
      synchronize: true,
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
