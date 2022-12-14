import {Request} from "express";
import {GoalItem, GoalReminderItem, ResponseObject} from "../../interfaces";
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


export const insertGoalItemAdapter = async (req: Request): Promise<ResponseObject<RunResult>> => {
    return new Promise<ResponseObject<RunResult>>((resolve, reject) => {

        const item: GoalItem = req.body as GoalItem


        const name: string = item.name;
        const endTime: number = item.endTime;
        let startTime: number = Date.now();
        if (item.startTime) {
            startTime = Number(item.startTime);
        }
        const categoryId: number = item.categoryId;

        const stmt: Statement<[string, number, number, number]> = serviceDB.prepare(`INSERT INTO goals (name, startTime, endTime, categoryId) VALUES (?, ?, ?, ?)`);

        if (!stmt) {
            reject(emptyStatementResponse);
        }

        const result: RunResult = stmt.run(name, startTime, endTime, categoryId);
        if (result) {
            resolve(responseObjectItem<RunResult>(req, result))
        } else {
            reject(emptyResultResponse);
        }
    });
}

export const insertReminderAdapter = async (req: Request): Promise<ResponseObject<RunResult>> => {
    return new Promise<ResponseObject<RunResult>>((resolve, reject) => {
        const item: GoalReminderItem = req.body as GoalReminderItem;

        const stmt: Statement<[string, number, number]> = serviceDB.prepare(`INSERT INTO reminders (name, triggerTime, referenceID) VALUES (?, ?, ?)`);

        if (!stmt) {
            reject(emptyStatementResponse);
        }

        const result: RunResult = stmt.run(item.name, item.triggerTime, item.referenceID);
        if (result) {
            resolve(responseObjectItem<RunResult>(req, result))
        } else {
            reject(emptyResultResponse);
        }
    });
}

export const updateGoalItemAdapter = async (req: Request): Promise<ResponseObject<RunResult>> => {
    return new Promise<ResponseObject<RunResult>>((resolve, reject) => {

        const item: GoalItem = req.body as GoalItem


        const id: number = item.id;
        const name: string = item.name;
        const endTime: number = item.endTime;
        let startTime: number = Date.now();
        if (item.startTime) {
            startTime = Number(item.startTime);
        }
        const categoryId: number = item.categoryId;

        const stmt: Statement<[string, number, number, number, number]> = serviceDB.prepare(`UPDATE goals SET  name = ?, startTime = ?, endTime = ?, categoryId = ? WHERE id = ?`);

        if (!stmt) {
            reject(emptyStatementResponse);
        }

        const result: RunResult = stmt.run(name, startTime, endTime, categoryId, id);
        if (result) {
            resolve(responseObjectItem<RunResult>(req, result))
        } else {
            reject(emptyResultResponse);
        }
    });
}