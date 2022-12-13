import {Request} from "express";
import {GoalItem, ResponseObject} from "../../interfaces";
import {Statement} from "better-sqlite3";
import {emptyResultResponse, emptyStatementResponse, responseObjectItems, serviceDB} from "../../helpers";

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
