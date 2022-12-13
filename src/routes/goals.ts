import {Router} from "express";
import {
    getAllGoalItemsController,
    insertReminderController,
    insertReminderWithoutTriggerController,
    insertGoalItemController
} from "../middleware/controllers/goals";

export const goals = Router();

goals
    .get("/", getAllGoalItemsController)
    .post("/",insertGoalItemController)
    .post("/reminder", insertReminderController)
    .post("/reminder/without", insertReminderWithoutTriggerController)
