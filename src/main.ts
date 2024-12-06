import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1');
  app.enableCors({
    // origin: 'http://localhost:5173',
    origin: 'http://116.196.66.106:8081',
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type, Accept'
  });
  await app.listen(3000);
}
bootstrap();
