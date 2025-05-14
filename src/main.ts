import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseTransformInterceptor } from './common/interceptors/response-transform.interceptor';
import { timingMiddleware } from './common/middlewares/timing.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(timingMiddleware);

  app.useGlobalInterceptors(new ResponseTransformInterceptor());

  app.setGlobalPrefix('api');

  await app.listen(process.env.APP_PORT ?? 3000);
}
bootstrap();
