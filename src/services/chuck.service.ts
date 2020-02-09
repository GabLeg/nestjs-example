import { Injectable } from "@nestjs/common";
import { ChuckJokesClient } from "../rest-clients";
import { ChuckJoke } from "../domain/chuck";

@Injectable()
export class ChuckService {

    constructor(private readonly chuckClient: ChuckJokesClient) {
    }

    async getJoke(): Promise<ChuckJoke> {
        return this.chuckClient.getJoke();
    }
}
