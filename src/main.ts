import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { GlobalExceptionFilter } from "./controllers/exceptions/exception-filters";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix("api/v1");
    app.useGlobalFilters(new GlobalExceptionFilter());
    loadSwagger(app);
    await app.listen(8080);
}

bootstrap();

function loadSwagger(app: INestApplication) {
    const options = new DocumentBuilder()
        .setTitle("Nestjs Example API")
        .setDescription("")
        .setVersion("1.0")
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup("api/v1/swagger-ui", app, document);
}
