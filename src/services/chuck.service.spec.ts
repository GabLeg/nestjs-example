import { ChuckService } from "./chuck.service";
import { ChuckJokesClient } from "../rest-clients";
import { instance, mock, resetCalls, verify, when } from "ts-mockito";
import { ChuckJoke } from "../domain/chuck";

const CHUCK_JOKE: ChuckJoke = {
    joke: "HAHAHA"
};

describe("ChuckService", () => {
    const chuckClientMock: ChuckJokesClient = mock(ChuckJokesClient);
    let chuckService: ChuckService;

    beforeEach(() => {
        resetCalls(chuckClientMock);
        chuckService = new ChuckService(instance(chuckClientMock));
    });

    describe("getJoke", () => {
        it("should call chuck client", async () => {
            when(chuckClientMock.getJoke()).thenResolve(CHUCK_JOKE);

            const result = await chuckService.getJoke();

            expect(result).toEqual(CHUCK_JOKE);
            verify(chuckClientMock.getJoke()).called();
        });
    });
});
