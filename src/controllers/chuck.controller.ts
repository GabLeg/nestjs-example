import { Controller, Get, HttpCode, HttpStatus, UseFilters } from "@nestjs/common";
import { ChuckControllerExceptionFilter } from "./exceptions/exception-filters";
import { ChuckJoke } from "../domain/chuck";
import { ChuckService } from "../services";
import { ApiResponse } from "@nestjs/swagger";

@Controller("api/v1/chuck")
@UseFilters(ChuckControllerExceptionFilter)
export class ChuckController {

    constructor(private readonly chuckService: ChuckService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiResponse({type: ChuckJoke})
    async getChuckJoke(): Promise<ChuckJoke> {
        return this.chuckService.getJoke();
    }
}
