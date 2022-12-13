import {Router} from "express";
import {
    getAllGoalItemsController,
    insertReminderController,
    insertReminderWithoutTriggerController
} from "../middleware/controllers/goals";

export const goals = Router();

goals
    .get("/", getAllGoalItemsController)
    .post("/reminder", insertReminderController)
    .post("/reminder/without", insertReminderWithoutTriggerController)
