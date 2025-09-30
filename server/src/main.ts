import type { RequestHandler } from "express";
import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'))

const logger: RequestHandler = (req, res, next) => {
    console.log(req.method, req.url);
    next();
}

app.use(logger);

const rootHandler: RequestHandler = (req, res) => {
    res.send('Hello World!');
}

const pathParamHandler: RequestHandler = (req, res) => {
    const { id } = req.params;
    res.send(`You requested resource with ID: ${id}`);
}

const queryParamHandler: RequestHandler = (req, res) => {
    const { search } = req.query;
    res.send(`You searched for: ${search}`);
}

app.get('/', rootHandler);
app.get('/search', queryParamHandler);
app.get('/resource/:id', pathParamHandler);



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})