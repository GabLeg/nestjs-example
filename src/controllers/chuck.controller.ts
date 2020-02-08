import { Controller, Get, HttpCode, HttpStatus, UseFilters } from "@nestjs/common";
import { ChuckControllerExceptionFilter } from "./exceptions/exception-filters";
import { ChuckJoke } from "../domain/chuck";
import { ChuckService } from "../services/chuck.service";

@Controller("/chuck")
@UseFilters(ChuckControllerExceptionFilter)
export class ChuckController {

    constructor(private readonly chuckService: ChuckService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    async getChuckJoke(): Promise<ChuckJoke> {
        return this.chuckService.getJoke();
    }
}
