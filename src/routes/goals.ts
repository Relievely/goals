import {Router} from "express";
import {
    getAllGoalItemsController,
    insertReminderController,
    insertGoalItemController,
    updateReminderController
} from "../middleware/controllers/goals";

export const goals = Router();

goals
    .get("/", getAllGoalItemsController)
    .post("/", insertGoalItemController)
    .post("/reminder", insertReminderController)
    .patch("/reminder", updateReminderController)
