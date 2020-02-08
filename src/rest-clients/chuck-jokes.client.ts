import { HttpService, Injectable } from "@nestjs/common";
import { ChuckJoke } from "../domain/chuck";
import { ConfigService } from "@nestjs/config";
import { ChuckNorrisException } from "../controllers/exceptions";
import { dtoToChuckJoke } from "./mappers";
import { ChuckJokeDto } from "./dto";

@Injectable()
export class ChuckJokesClient {

    constructor(private readonly httpService: HttpService,
                private readonly configService: ConfigService) {
    }

    async getJoke(): Promise<ChuckJoke> {
        return this.httpService.get<ChuckJokeDto>(`${this.configService.get("CHUCK_JOKES_URL")}/jokes/random`)
                   .toPromise()
                   .then(response => dtoToChuckJoke(response.data))
                   .catch(() => {
                       throw new ChuckNorrisException();
                   });
    }
}
