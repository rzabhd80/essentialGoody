import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { NestMicroserviceOptions } from "@nestjs/common/interfaces/microservices/nest-microservice-options.interface";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const port = process.env.API_PORT || 4000;
  const globalPrefix = "api";
  app.setGlobalPrefix(globalPrefix);

  const config = new DocumentBuilder()
    .setTitle("Code Challenge")
    .setDescription("Simple Web API ")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(globalPrefix, app, document, {
    swaggerOptions: { persistAuthorization: true },
  });
  await app.listen(port);
}

bootstrap();
