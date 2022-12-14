import {Router} from "express";

import {getAllGoalItemsController, insertReminderController,insertReminderWithoutTriggerController,insertGoalItemController, updateGoalItemController} from "../middleware/controllers/goals";

export const goals = Router();

goals
    .get("/", getAllGoalItemsController)
    .post("/",insertGoalItemController)
    .post("/reminder", insertReminderController)
    .post("/reminder/without", insertReminderWithoutTriggerController)
    .post("/update", updateGoalItemController)
