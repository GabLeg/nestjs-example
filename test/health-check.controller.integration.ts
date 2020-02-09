import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import * as request from "supertest";

describe("HealthCheckController", () => {
    let app;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    describe("GET ping", () => {
        it("should return http 200", () => {

            return request(app.getHttpServer())
            .get("/ping")
            .expect(200)
            .expect("pong");
        });
    });
});
