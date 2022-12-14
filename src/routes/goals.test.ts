import {beforeAll, describe, expect, it} from "@jest/globals";
import {databaseInit} from "./jestPresets";
import supertest, {Response} from "supertest";
import {app} from "../app";
import {GoalItem, ResponseObject} from "../interfaces";
import {RunResult} from "better-sqlite3";

beforeAll(() => databaseInit());

const requestWithSuperTest = supertest(app);

describe("Goal routes", () => {
    it("should insert a new reminder", async () => {
        await requestWithSuperTest
            .post("/goals/reminder")
            .send({name: "Bake 20 cookies", triggerTime: 1670920679, referenceID: 1})
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response: Response) => {
                expect(response).toBeDefined();
                const responseObject = response.body as ResponseObject<RunResult>
                expect(responseObject.data.length).toBeGreaterThanOrEqual(1);
            });
    })


    it("should update reminder", async () => {
        await requestWithSuperTest
            .patch("/goals/reminder")
            .send({id: 1, triggerTime: 1670920680})
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response: Response) => {
                expect(response).toBeDefined();
                const responseObject = response.body as ResponseObject<RunResult>
                expect(responseObject.data.length).toBeGreaterThanOrEqual(1);
            });
    })

    it("should insert a new reminder without trigger time", async () => {
        await requestWithSuperTest
            .post("/goals/reminder/without")
            .send({name: "Being on a diet", referenceID: 1})

            .expect(200)
            .expect('Content-Type', /json/)
            .then((response: Response) => {
                expect(response).toBeDefined();
                const responseObject = response.body as ResponseObject<RunResult>
                expect(responseObject.data.length).toBeGreaterThanOrEqual(1);
            });
    })

    it("should insert a new goal", async () => {
        await requestWithSuperTest
            .post("/goals/")
            .send({name: "losing weight", startTime: 1, categoryId: 1})
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response: Response) => {
                expect(response).toBeDefined();
                const responseObject = response.body as ResponseObject<RunResult>
                expect(responseObject.data.length).toBeGreaterThanOrEqual(1);
            });
    })

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