import {Router} from "express";
import {fillTablesController, createTablesController} from "../middleware/controllers/tableController";

export const creation = Router();

creation
    .all("/create", createTablesController)
    .all("/fill", fillTablesController);