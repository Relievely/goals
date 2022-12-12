import {Router} from "express";
import {fillTablesController, createTablesController} from "../middleware/controllers/tableController";

export const creation = Router();

creation
    .put("/create", createTablesController)
    .put("/fill", fillTablesController);