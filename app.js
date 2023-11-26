const express = require("express");
require("./src/db/");

const questionRouter = require("./src/routes/question");
const app = express();

app.use(express.json());
app.use('/api/v1/', questionRouter);

app.get("*", (req, res) => {
    res.status(404).send({ message: "Page not found" });
});

module.exports = app;