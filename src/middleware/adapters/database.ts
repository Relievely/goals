import {Request} from "express";

import {ResponseObject} from "../../interfaces";

import {RunResult, Statement} from "better-sqlite3";
import {
    emptyResultResponse,
    emptyStatementResponse,
    responseObjectItems,
    serviceDB
} from "../../helpers";

export const createTablesAdapter = async (req: Request): Promise<ResponseObject<RunResult[]>> => {
    return new Promise<ResponseObject<RunResult[]>>((resolve, reject) => {
        const endResult: RunResult[] = [];

        const createGoalsTable: Statement = serviceDB.prepare(`CREATE TABLE IF NOT EXISTS goals (
                                                                         id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT,
                                                                         name TEXT,
                                                                         startTime DATE,
                                                                         endTime DATE,
                                                                         categoryId INT,
                                                                         FOREIGN KEY (categoryId) REFERENCES categories(id)
                                                                );`);

        if (!createGoalsTable) {
            reject(emptyStatementResponse);
        }

        const createCategoriesTable: Statement = serviceDB.prepare(`CREATE TABLE IF NOT EXISTS categories(
                                                                             id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT,
                                                                             name TEXT
                                                                );`);

        if (!createCategoriesTable) {
            reject(emptyStatementResponse);
        }

        const createRemindersTable: Statement = serviceDB.prepare(`CREATE TABLE IF NOT EXISTS reminders
                                                                  (
                                                                      id INTEGER UNIQUE PRIMARY KEY AUTOINCREMENT,
                                                                      name TEXT,
                                                                      triggerTime INTEGER,
                                                                      referenceID INTEGER,
                                                                      FOREIGN KEY (referenceID) REFERENCES goals(id)
            )`);

        if (!createRemindersTable) {
            reject(emptyStatementResponse);
        }

        serviceDB.transaction(() => {
            const goalsResult: RunResult = createGoalsTable.run();
            if (goalsResult) {
                endResult.push(goalsResult);
            } else {
                reject(emptyResultResponse);
            }
            const categoriesResult: RunResult = createCategoriesTable.run();
            if (categoriesResult) {
                endResult.push(categoriesResult);
            } else {
                reject(emptyResultResponse);
            }
            const remindersResult: RunResult = createRemindersTable.run();
            if (remindersResult) {
                endResult.push(remindersResult);
            } else {
                reject(emptyResultResponse);
            }
        })();

        resolve(responseObjectItems<RunResult>(req, endResult));
    })
}

export const fillTablesAdapter = async (req: Request): Promise<ResponseObject<RunResult[]>> => {
    return new Promise<ResponseObject<RunResult[]>>((resolve, reject) => {

        const endResult: RunResult[] = [];

        const fillCategoriesTable = serviceDB.prepare(`INSERT OR IGNORE INTO categories (name)
                                              VALUES ('Sports'),
                                               ('Study'),
                                                ('Cooking')
                                                `);

        const fillGoalsTable = serviceDB.prepare(`INSERT OR IGNORE INTO goals (name, startTime, endTime, categoryId)
                                              VALUES ('Do 100 push-ups', '2023-01-23', '2023-02-03', '1'),
                                               ('Learn Typescript', '2023-01-01', '2023-03-13', '2'),
                                                ('Make Lasagne', '2023-03-14', '2023-03-15', '3')
                                                `);

        try {
            serviceDB.transaction(() => {
                const categoriesResult: RunResult = fillCategoriesTable.run();
                const goalsResult: RunResult = fillGoalsTable.run();
                endResult.push(categoriesResult, goalsResult);
            })();

            resolve(responseObjectItems<RunResult>(req, endResult));
        } catch (err) {
            reject(err);
        }

    })
}