import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";

@Controller("/ping")
export class HealthCheckController {

    @Get()
    @HttpCode(HttpStatus.OK)
    ping() {
        return "pong";
    }
}
