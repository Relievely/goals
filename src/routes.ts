import {Express} from "express";
import {creation} from "./routes/creation";

import {goals} from "./routes/goals";

export const routes = (app: Express) => {
    app.use(creation);
    app.use("/goals", goals)
}