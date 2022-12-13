import {Router} from "express";
import {getAllGoalItemsController, insertReminderController, insertGoalItemController} from "../middleware/controllers/goals";

export const goals = Router();

goals
    .get("/", getAllGoalItemsController)
    .post("/reminder", insertReminderController)
    .post("/",insertGoalItemController)