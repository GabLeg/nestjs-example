import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import * as request from "supertest";
import { ChuckJokeDto } from "../src/rest-clients/dto";
import { ChuckJoke } from "../src/domain/chuck";
import nock = require("nock");

const CHUCK_JOKE_DTO: ChuckJokeDto = {
    value: {
        id: 123,
        joke: "A joke."
    },
    type: "joke"
};

describe("ChuckController", () => {
    let app;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
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
            .get("/api/v1/chuck")
            .expect(200)
            .expect(expectedValue);
        });

        it("should return http 500 when problem with external service", () => {
            nock("http://patate.com")
            .get("/jokes/random")
            .reply(503);

            return request(app.getHttpServer())
            .get("/api/v1/chuck")
            .expect(500);
        });
    });
});
