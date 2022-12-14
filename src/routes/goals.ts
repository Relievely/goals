import {Router} from "express";
import {getAllGoalItemsController, insertReminderController, insertGoalItemController, updateGoalItemController} from "../middleware/controllers/goals";

export const goals = Router();

goals
    .get("/", getAllGoalItemsController)
    .post("/reminder", insertReminderController)
    .post("/",insertGoalItemController)
    .post("/update", updateGoalItemController)