import {Request} from "express";
import {GoalItem, ResponseObject} from "../../interfaces";
import {RunResult, Statement} from "better-sqlite3";
import {
    emptyResultResponse,
    emptyStatementResponse,
    responseObjectItem,
    responseObjectItems,
    serviceDB
} from "../../helpers";

export const getAllGoalItemsAdapter = async (req: Request): Promise<ResponseObject<GoalItem[]>> => {
    return new Promise<ResponseObject<GoalItem[]>>((resolve, reject) => {
        const stmt: Statement = serviceDB.prepare(`SELECT * FROM goals`);

        if (!stmt) {
            reject(emptyStatementResponse);
        }

        const results: GoalItem[] = stmt.all() as GoalItem[];

        if (results) {
            resolve(responseObjectItems<GoalItem>(req, results))
        } else {
            reject(emptyResultResponse)
        }
    });
}


export const createGoalItemAdapter = async (req: Request): Promise<ResponseObject<RunResult>> => {
    return new Promise<ResponseObject<RunResult>>((resolve, reject) => {

        const item: GoalItem = req.body as GoalItem


        const name: string = item.name;
        let startTime: number = Date.now();
        if (item.startTime) {
            startTime = Number(item.startTime);
        }
        const categoryId: number = item.categoryId;

        const stmt: Statement<[string, number, number]> = serviceDB.prepare(`INSERT INTO goals (name, startTime, categoryId) VALUES (?, ?, ?)`);

        if (!stmt) {
            reject(emptyStatementResponse);
        }

        const result: RunResult = stmt.run(name, startTime, categoryId);
        if (result) {
            resolve(responseObjectItem<RunResult>(req, result))
        } else {
            reject(emptyResultResponse);
        }
    });
}
