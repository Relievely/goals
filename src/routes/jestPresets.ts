import supertest, {Response} from "supertest";
import {expect} from "@jest/globals";
import {ResponseObject} from "../interfaces";
import {RunResult} from "better-sqlite3";
import {app} from "../app";


export const databaseInit = async () => {
    const requestWithSuperTest = supertest(app);

    await requestWithSuperTest
        .put("/create")
        .expect(200)
        .expect('Content-Type', /json/)
        .then((response: Response) => {
            expect(response).toBeDefined();
            const length = (response.body as ResponseObject<RunResult[]>).data.length;
            expect(length).toBeGreaterThanOrEqual(0);
            expect(length).toBeLessThanOrEqual(2);
        });
}