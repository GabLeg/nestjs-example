import {Injectable} from "@nestjs/common";
import {ChuckJoke} from "../domain/chuck";
import {ConfigService} from "@nestjs/config";
import {ChuckNorrisException} from "../controllers/exceptions";
import {dtoToChuckJoke} from "./mappers";
import {ChuckJokeDto} from "./dto";
import {HttpService} from "@nestjs/axios";
import {firstValueFrom, map} from "rxjs";

@Injectable()
export class ChuckJokesClient {

  constructor(private readonly httpService: HttpService,
              private readonly configService: ConfigService) {
  }

  async getJoke(): Promise<ChuckJoke> {
    try {
      return firstValueFrom(this.httpService.get<ChuckJokeDto>(`${this.configService.get("CHUCK_JOKES_URL")}/jokes/random`)
          .pipe(map(response => dtoToChuckJoke(response.data))))
    } catch (error) {
      throw new ChuckNorrisException()
    }
  }
}
