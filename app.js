import express from "express";
import bodyparser from "body-parser";
import cors from "cors";

import db from "./config/database";
import hb from "./config/handlebars"
import users from "./routes/users"

const app = express();

//set template engine
app.engine("hbs", hb);
app.set("view engine","hbs");

