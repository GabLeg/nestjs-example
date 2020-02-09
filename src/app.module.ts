import { HttpModule, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ChuckJokesClient } from "./rest-clients";
import { ChuckService } from "./services";
import { ChuckController, HealthCheckController } from "./controllers";

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [ChuckController, HealthCheckController],
  providers: [ChuckService, ChuckJokesClient],
})
export class AppModule {}
