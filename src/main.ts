import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // apply the exception filter globally
  app.useGlobalFilters(new HttpExceptionFilter());
  
  const options = new DocumentBuilder()
    .setTitle('API docs')
    .addTag('user')
    .addTag('task')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(8100);
}
bootstrap();
