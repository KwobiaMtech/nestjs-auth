import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthModule } from './modules/auth/auth.module';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: /.*/,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
    .setTitle('Gopele API Platform')
    .setDescription('Description')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    include: [AuthModule],
  });
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
}
bootstrap();