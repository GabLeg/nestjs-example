import { ChuckJokeDto } from "../dto";
import { ChuckJoke } from "../../domain/chuck";
import { get } from "lodash";

export function dtoToChuckJoke(jokeDto: ChuckJokeDto): ChuckJoke {
    return {
        joke: get(jokeDto, "value.joke")
    };
}
