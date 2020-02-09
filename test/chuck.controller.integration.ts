import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import * as request from "supertest";
import nock = require("nock");
import { ChuckJokeDto } from "../src/rest-clients/dto";
import { ChuckJoke } from "../src/domain/chuck";

const CHUCK_JOKE_DTO: ChuckJokeDto = {
    value: {
        id: 123,
        joke: "A joke."
    },
    type: "joke"
};

describe("ChuckController", () => {
    let app;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
        process.env.CHUCK_JOKES_URL = "http://patate.com";

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    describe("GET Joke", () => {
        it("should return http 200 with a joke", () => {
            const expectedValue: ChuckJoke = {
                joke: "A joke."
            };
            nock("http://patate.com")
            .get("/jokes/random")
            .reply(200, CHUCK_JOKE_DTO);

            return request(app.getHttpServer())
            .get("/chuck")
            .expect(200)
            .expect(expectedValue);
        });
    });
});
