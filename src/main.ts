import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    forbidNonWhitelisted:true,
    transform: true
  }));
  const options = new DocumentBuilder()
    .setTitle('File Explorer API')
    .setDescription('The File Explorer API lets you simulate a file system storing files')
    .setVersion('1.0')
    .addTag('files')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(4001);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
