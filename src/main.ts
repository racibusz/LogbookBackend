import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Konfiguracja CORS
  app.enableCors({
    origin: 'http://localhost:3000', // Adres frontendu
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Pozwala na przesyłanie ciasteczek
  });

  app.use(
    session({
      secret: 'chuj',
      resave: false,
      saveUninitialized: false,
    })
  );

  await app.listen(3001);
}
bootstrap();
