import { Router } from "express";
import {getAllGoalItemsController} from "../middleware/controllers/goals";

export const goals = Router();

goals
    .get("/", getAllGoalItemsController)