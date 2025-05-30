import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/users.entity'; // dodaj inne encje, jeśli masz
import { Flight } from '../flights/flights.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      database: 'logbok_app',
      username: 'root',
      password: '',
      host: 'localhost',
      entities: [User, Flight],
      synchronize: true,
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
