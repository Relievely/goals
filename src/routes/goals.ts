import {Router} from "express";
import {getAllGoalItemsController, insertReminderController} from "../middleware/controllers/goals";

export const goals = Router();

goals
    .get("/", getAllGoalItemsController)
    .post("/reminder", insertReminderController)