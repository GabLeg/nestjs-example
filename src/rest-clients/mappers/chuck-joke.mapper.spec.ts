import { ChuckJokeDto } from "../dto";
import { ChuckJoke } from "../../domain/chuck";
import { dtoToChuckJoke } from "./chuck-joke.mapper";

describe("dtoToChuckJoke", () => {
    const chuckJokeDto: ChuckJokeDto = {
        type: "joke",
        value: {
            joke: "it just a prank bro!",
            id: 123
        }
    };
    it("should map correctly", () => {
        const expectedJoke: ChuckJoke = {
            joke: chuckJokeDto.value.joke
        };

        const result: ChuckJoke = dtoToChuckJoke(chuckJokeDto);

        expect(result).toEqual(expectedJoke);
    });
});
