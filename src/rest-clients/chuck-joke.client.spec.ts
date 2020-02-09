import { HttpService } from "@nestjs/common";
import { instance, mock, when } from "ts-mockito";
import { ChuckJokesClient } from "./chuck-jokes.client";
import { ConfigService } from "@nestjs/config";
import { ChuckJokeDto } from "./dto";
import { of } from "rxjs";
import { AxiosResponse } from "axios";

const CHUCK_JOKE_DTO: ChuckJokeDto = {
    type: "joke",
    value: {
        id: 123,
        joke: "Just a prank..."
    }
};

describe("ChuckJokeClient", () => {
    const httpServiceMock: HttpService = mock(HttpService);
    const configServiceMock: ConfigService = mock(ConfigService);
    let chuckJokeClient: ChuckJokesClient;

    beforeAll(() => {
        when(configServiceMock.get<string>("CHUCK_JOKES_URL")).thenReturn("http://localhost");
    });

    beforeEach(() => {
        chuckJokeClient = new ChuckJokesClient(instance(httpServiceMock), instance(configServiceMock));
    });

    describe("getJoke", () => {
        it("should return chuck joke", async () => {
            const axiosResponse: AxiosResponse = createAxiosResponse(CHUCK_JOKE_DTO, 200);
            when(httpServiceMock.get("http://localhost/jokes/random")).thenReturn(of(axiosResponse));

            const result = await chuckJokeClient.getJoke();

            expect(result.joke).toEqual(CHUCK_JOKE_DTO.value.joke);
        });
    });
});

function createAxiosResponse(data: any, status: number): AxiosResponse {
    return {
        data,
        status,
        config: null,
        statusText: "status",
        headers: null
    };
}
