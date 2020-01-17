import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/common/enums/transport.enum';

async function bootstrap() {

  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: { retryAttempts: 5, retryDelay: 3000, port: 3005 }
  });
  // app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listenAsync();
}
bootstrap();
 