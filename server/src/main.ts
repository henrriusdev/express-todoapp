import "reflect-metadata"
import "dotenv/config"
import type { RequestHandler } from "express";
import express from "express";
import {todoRoutes, userRoutes} from "./api/routes";
import {initializeStore} from "./lib/store/store";
import swaggerJsDoc from "swagger-jsdoc";
import {apiReference} from "@scalar/express-api-reference";

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Todo App',
            version: '1.0.0',
            description: 'A simple Todo application API with user management',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 3000}`,
                description: 'Development server',
            },
        ],
    },
    apis: ['./src/api/handler/*.ts'], // files containing annotations as above
};
const openapiSpecification = swaggerJsDoc(options);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'))
app.get('/openapi.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(openapiSpecification);
});
app.use(
    '/reference',
    apiReference({
        // Put your OpenAPI url here:
        url: '/openapi.json',
    }),
)

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