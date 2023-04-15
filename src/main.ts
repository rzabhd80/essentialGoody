import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.API_PORT || 4000;
  const globalPrefix = "api";
  app.setGlobalPrefix(globalPrefix);

  await app.listen(3000);
  const config = new DocumentBuilder()
    .setTitle("Code Challenge")
    .setDescription("Simple Web API ")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
}

bootstrap();
