import "reflect-metadata"
import "dotenv/config"
import type { RequestHandler } from "express";
import express from "express";
import {todoRoutes, userRoutes} from "./api/routes";
import {initializeStore} from "./lib/store/store";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'))

initializeStore()
const logger: RequestHandler = (req, res, next) => {
    console.log(req.method, req.url);
    next();
}

app.use(logger);

app.use("/users", userRoutes())
app.use("/todos", todoRoutes())



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})