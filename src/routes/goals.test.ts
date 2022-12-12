import {beforeAll, describe, expect, it} from "@jest/globals";
import { databaseInit } from "./jestPresets";
import supertest, {Response} from "supertest";
import {app} from "../app";
import {GoalItem, ResponseObject} from "../interfaces";

beforeAll(() => databaseInit());

const requestWithSuperTest = supertest(app);

describe("Goal routes", () => {
    it("should get all goal items", async () => {
        await requestWithSuperTest
            .get("/goals")
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response: Response) => {
                expect(response).toBeDefined();
                const responseObject = response.body as ResponseObject<GoalItem[]>
                expect(responseObject.data.length).toBeGreaterThanOrEqual(0);
            });
    })
});