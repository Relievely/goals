import {Request, Response} from "express";
import {GoalItem, ResponseObject} from "../../interfaces";
import {responseError} from "../../helpers";
import {
    getAllGoalItemsAdapter,
    insertGoalItemAdapter,
    updateReminderAdapter
    insertReminderWithoutTriggerAdapter,
    insertReminderAdapter,
    updateGoalItemAdapter
} from "../adapters/goals";
import {RunResult} from "better-sqlite3";

export const getAllGoalItemsController = (req: Request, res: Response<ResponseObject<GoalItem[]>>): void => {
    getAllGoalItemsAdapter(req)
        .then((response: ResponseObject<GoalItem[]>) => res.status(200).json(response))
        .catch((err: Error) => res.status(500).json(responseError(req, err.message)))
}

export const insertReminderController = (req: Request, res: Response<ResponseObject<RunResult>>): void => {
    insertReminderAdapter(req)
        .then((response: ResponseObject<RunResult>) => res.status(200).json(response))
        .catch((err: Error) => {
            console.error(err.message);
            res.status(500).json(responseError(req, err.message))
        })
}

export const insertReminderWithoutTriggerController = (req: Request, res: Response<ResponseObject<RunResult>>): void => {
    insertReminderWithoutTriggerAdapter(req)
        .then((response: ResponseObject<RunResult>) => res.status(200).json(response))
        .catch((err: Error) => {
            console.error(err.message);
            res.status(500).json(responseError(req, err.message))
        })
}
export const insertGoalItemController = (req: Request, res: Response<ResponseObject<RunResult>>): void => {
    insertGoalItemAdapter(req)
        .then((response: ResponseObject<RunResult>) => res.status(200).json(response))
        .catch((err: Error) => res.status(500).json(responseError(req, err.message)))
}

export const updateReminderController = (req: Request, res: Response<ResponseObject<RunResult>>): void => {
    updateReminderAdapter(req)
        .then((response: ResponseObject<RunResult>) => res.status(200).json(response))
        .catch((err: Error) => res.status(500).json(responseError(req, err.message)))
}

export const updateGoalItemController = (req: Request, res: Response<ResponseObject<RunResult>>): void => {
    updateGoalItemAdapter(req)
        .then((response: ResponseObject<RunResult>) => res.status(200).json(response))
        .catch((err: Error) => res.status(500).json(responseError(req, err.message)))
}

