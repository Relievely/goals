import { Router } from "express";
import {getAllGoalItemsController, insertGoalItemController} from "../middleware/controllers/goals";

export const goals = Router();

goals
    .get("/", getAllGoalItemsController)
    .post("/",insertGoalItemController)