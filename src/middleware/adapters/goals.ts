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

export const insertReminderWithoutTriggerAdapter = async (req: Request): Promise<ResponseObject<RunResult>> => {
    return new Promise<ResponseObject<RunResult>>((resolve, reject) => {
        const item: GoalReminderItem = req.body as GoalReminderItem;

        const stmt: Statement<[string, number]> = serviceDB.prepare(`INSERT INTO reminders (name, referenceID) VALUES (?, ?)`);

        if (!stmt) {
            reject(emptyStatementResponse);
        }

        const result: RunResult = stmt.run(item.name, item.referenceID);
        if (result) {
            resolve(responseObjectItem<RunResult>(req, result))
        } else {
            reject(emptyResultResponse);
        }
    });
}