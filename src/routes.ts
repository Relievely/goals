import cors from "cors";
import {Express} from "express";
import {creation} from "./routes/creation";

import {goals} from "./routes/goals";
import pino_http from "pino-http";
import bodyParser from "body-parser";
import multer, {Multer} from "multer";

const form: Multer = multer();

export const routes = (app: Express) => {
    app.use(cors({
        "origin": "*",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "preflightContinue": false,
        "optionsSuccessStatus": 204
    }));

    app.use(pino_http());
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
    app.use(form.any())

    app
        .use(creation)
        .use("/goals", goals)
}