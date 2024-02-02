import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { INestApplication, Logger } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { GlobalExceptionFilter } from "./controllers/exceptions/exception-filters";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new GlobalExceptionFilter());
    loadSwagger(app);
    const config: ConfigService = app.get(ConfigService);
    await app.listen(config.get("SERVER_PORT"));
    Logger.log(`Server started on port : ${config.get("SERVER_PORT")}`);
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
