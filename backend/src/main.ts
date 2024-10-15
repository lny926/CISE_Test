import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // Allow requests from the frontend
  });
  const port = process.env.PORT || 8082;
  await app.listen(port, () => console.log(`Server running on port ${port}`));
}
bootstrap();
