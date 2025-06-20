import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { FlightsModule } from './flights/flights.module';
import { AirplnaesModule } from './airplanes/airplanes.module';

@Module({
  imports: [AuthModule, DatabaseModule, UsersModule, FlightsModule, AirplnaesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
