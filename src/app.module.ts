import { HttpModule, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ChuckController } from "./controllers";
import { ChuckJokesClient } from "./rest-clients";
import { ChuckService } from "./services";

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [ChuckController],
  providers: [ChuckService, ChuckJokesClient],
})
export class AppModule {}
