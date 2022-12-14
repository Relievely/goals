import {Router} from "express";

import {
    getAllGoalItemsController,
    insertReminderController,
    insertGoalItemController,
    updateReminderController,
    insertReminderWithoutTriggerController,
    updateGoalItemController
} from "../middleware/controllers/goals";


export const goals = Router();

goals
    .get("/", getAllGoalItemsController)
    .post("/", insertGoalItemController)
    .post("/reminder", insertReminderController)
    .patch("/reminder", updateReminderController)
    .post("/reminder/without", insertReminderWithoutTriggerController)
    .post("/update", updateGoalItemController)
